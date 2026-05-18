# URL Shortener

A backend-based URL shortening service built using Node.js, Express, and MongoDB.

This project was created as an introductory backend development project to understand how APIs, databases, authentication systems, and server-side applications work together in a real-world application.

The application allows users to create shortened URLs, redirect users using those short links, and securely manage authenticated functionality using JWT authentication. It also includes analytics tracking and user-specific URL history management.

---

## Features

- Shorten long URLs into compact shareable links
- Redirect users using shortened URLs
- JWT-based authentication and authorization
- User signup and login system
- Protected routes
- URL analytics dashboard
- User-specific URL history
- MongoDB database integration
- REST API architecture
- Secure password hashing
- Modular backend structure

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Tokens)
- bcrypt

### Tools & Utilities
- dotenv
- nodemon

---

## How It Works

```text
User sends long URL
        ↓
Server generates unique short ID
        ↓
URL stored in MongoDB
        ↓
Short URL returned to user
        ↓
Analytics tracked on visits
        ↓
Accessing /url/:id redirects user
```

---

## API Endpoints

### Shorten URL

```http
POST /url/
```

Request Body:

```json
{
  "url": "https://example.com"
}
```

Returns a shortened URL ID.

---

### Redirect to Original URL

```http
GET /url/:id
```

Redirects the user to the original URL associated with the short ID.

---

### Authentication Routes

```http
/auth/
```

Handles:
- User signup
- User login
- JWT token generation
- Authorization

---

## Authentication

This project uses JWT-based authentication for securing protected routes and handling user sessions.

Features include:
- Secure user authentication
- Token generation and verification
- Protected API routes
- Authorization middleware
- Password hashing using bcrypt

---

## Analytics Dashboard

The application includes analytics support for shortened URLs.

Tracked information may include:
- Total clicks
- URL visit history
- User-specific links
- Usage tracking

Users can manage and monitor their generated URLs through a personalized history system.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/URL-Shortener.git
```

Move into the project directory:

```bash
cd URL-Shortener
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the development server:

```bash
npm run dev
```

---

## Project Structure

```text
URL-Shortener/
│
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── utils/
├── .env
├── server.js
└── package.json
```

---

## Learning Outcomes

This project helped me understand:
- Backend development fundamentals
- REST APIs
- Express routing
- MongoDB integration
- Authentication and authorization
- JWT implementation
- Password hashing
- Database relationships
- Backend project structuring
- Analytics tracking systems

---

## Future Improvements

- Custom aliases for URLs
- Advanced analytics graphs
- Link expiration support
- Rate limiting
- QR code generation
- Docker deployment
- Public API documentation

---

## License

This project is open-source and available under the MIT License.
