# URL Shortener

## Description

The URL Shortener project is a web application designed to convert long URLs into shorter, more manageable links. This application provides users with a convenient way to share links while saving space and improving readability. The project consists of both a backend server and a frontend user interface, enabling users to shorten URLs and access them with ease.

## Key Features to be achieved/added

1. **URL Shortening:** Users should be able to input long URLs into the application, which should be able to generate a shortened version of the link. The shortened URL is created using a combination of random characters or a custom alias provided by the user.

2. **Custom Short URLs:** Users should have the option to customize their shortened URLs by specifying a custom alias. This feature allows for more personalized and recognizable short links.

3. **User Authentication:** The application must support user authentication, allowing users to register accounts, log in, and manage their shortened URLs. Authenticated users gain access to additional features such as URL analytics and management.

4. **URL Analytics:** The application should track statistics for shortened URLs, including the number of clicks, referrers, and geographic locations of visitors. Users can view detailed analytics reports to gain insights into the performance of their links.

5. **URL Expiry and Deactivation:** Users should be able to set expiration dates for shortened URLs, ensuring that links are automatically deactivated after a specified period. This feature helps prevent redirection to outdated or invalid content.

6. **Batch URL Shortening:** Users should have the ability to shorten multiple URLs simultaneously by uploading a text file or entering a list of URLs. The application processes batch requests efficiently and provides users with shortened links for each input URL.

7. **QR Code Generation:** The application should generate QR codes for shortened URLs, allowing users to share links in print or digital media. QR codes provide a convenient way for users to access shortened URLs using mobile devices.

8. **URL Management:** Users should be able to manage their shortened URLs through the application's user interface. This includes editing, deleting, and archiving URLs, as well as viewing revision history and versioning for edited links.

9. **Localization and Internationalization:** The application should support multiple languages and locales, enabling users from diverse regions to use the platform in their preferred language.

## Technologies Used

- **Backend:** GoLang (Gin framework), Redis (for data caching)
- **Frontend:** React, Axios (for HTTP requests)
- **Database:** Redis (for storing URL mappings and analytics data)
- **Authentication:** JWT (JSON Web Tokens)
- **Additional Tools:** CORS middleware (for cross-origin resource sharing), Chart.js (for URL analytics visualization), react-i18next (for localization)

## Project Goals

The goal of the URL Shortener project is to provide users with a reliable and user-friendly platform for creating and managing shortened URLs. By offering a comprehensive set of features including custom short URLs, URL analytics, and user authentication, the project aims to meet the diverse needs of users while ensuring the security and scalability of the application.

## How to Start and Use the Project

### Prerequisites

Before running the project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [GoLang](https://golang.org/)
- [Redis](https://redis.io/)

### Steps to Start the Backend Server

1. Clone the repository to your local machine:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    go mod tidy
    ```

4. Start the backend server:

    ```bash
    go run main.go
    ```

    The backend server should now be running on [http://localhost:8080](http://localhost:8080).

### Steps to Start the Frontend Application

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

    The frontend development server should now be running on [http://localhost:3000](http://localhost:3000). You can access the URL Shortener application in your web browser.
