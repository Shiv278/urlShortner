package main

import (
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

var (
	redisClient *redis.Client
)

type ShortURL struct {
	OriginalURL        string `json:"original_url"`
	ShortURL           string `json:"short_url"`
	ExpirationDateTime string `json:"expiration_date_time"`
}

func generateShortURL() string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	seededRand := rand.New(rand.NewSource(time.Now().UnixNano()))
	b := make([]byte, 6)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func shortenURL(c *gin.Context) {
	var inputURL ShortURL
	if err := c.BindJSON(&inputURL); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	if inputURL.OriginalURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "URL not provided"})
		return
	}

	_, err := url.ParseRequestURI(inputURL.OriginalURL)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL. Please provide proper url."})
		return
	}

	shortURL := inputURL.ShortURL
	if shortURL == "" {
		shortURL = generateShortURL()
	}

	var expirationTime time.Duration

	loc, _ := time.LoadLocation("Asia/Kolkata")
	if inputURL.ExpirationDateTime != "" {
		expirationDateTime, err := time.ParseInLocation("2006-01-02T15:04", inputURL.ExpirationDateTime, loc)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expiration date format. Please provide date in YYYY-MM-DD format."})
			return
		}

		expirationDateTime = expirationDateTime.UTC()

		expirationTime = expirationDateTime.Sub(time.Now())
	} else {
		expirationTime = time.Hour * 24
	}

	// Store the mapping in a database or cache (e.g., Redis)
	err = redisClient.Set(shortURL, inputURL.OriginalURL, expirationTime).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to shorten URL"})
		return
	}

	c.JSON(http.StatusOK, ShortURL{OriginalURL: inputURL.OriginalURL, ShortURL: shortURL})
}

func redirectToOriginalURL(c *gin.Context) {
	shortURL := c.Param("shortURL")
	originalURL, err := redisClient.Get(shortURL).Result()
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Short URL not found"})
		return
	}

	c.Redirect(http.StatusMovedPermanently, originalURL)
}

func main() {
	// Initialize Redis client
	redisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Update with your Redis server address
		Password: "",               // Set password if needed
		DB:       0,                // Use default DB
	})

	// Initialize Gin router
	r := gin.Default()

	// CORS middleware configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Allow requests from this origin
	r.Use(cors.New(config))

	// Define API routes
	r.POST("/shorten", shortenURL)
	r.GET("/:shortURL", redirectToOriginalURL)

	// Run server
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
