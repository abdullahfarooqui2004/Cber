# UBER

A working web application clone of UBER with all the features

## Application basics

- **Language:** JavaScript
- **Backend framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **API base URL:** `http://localhost:5000/api`
- **Default development command:** `npm run dev`

The application currently provides authentication and user-profile endpoints. It does not yet include a frontend or protected application routes beyond the profile endpoint.

## Features

- Register a new user.
- Log in with an email address and password.
- Receive a JWT in both the response body and a `token` cookie.
- View the authenticated user's profile.
- Log out by clearing the cookie and blacklisting the token.
- Hash passwords with `bcryptjs` before storing them.
- Validate registration and login input with `express-validator`.
- Connect to MongoDB through Mongoose.

## Prerequisites

Before starting the backend, make sure you have:

- Node.js and npm installed.
- A running MongoDB instance, such as a local MongoDB server or a MongoDB Atlas cluster.
- A `.env` file in the `backend` directory.

## Environment variables

Create `backend/.env` and configure the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/cyber
JWT_SECRET=replace_this_with_a_long_random_secret
```

Replace the MongoDB URI with the connection string for your MongoDB deployment. The JWT secret should be a long, random value and should not be shared publicly.

> The current application does not use a separate database name in the URL unless the MongoDB URI includes it. The example above uses the `cyber` database.

## Installation

From the repository root, install the backend dependencies:

```bash
cd backend
npm install
```

Start the development server:

```bash
npm run dev
```

The server starts on the port defined by `PORT`. The development server uses `nodemon`, so it automatically restarts when source files change.

## API routes

All authentication routes are available under `/api/auth`.

### Test the server

```http
GET /api/auth/
```

Example response:

```json
"Working"
```

### Register a user

```http
POST /api/auth/register
```

**Request body:**

```json
{
	"fullname": {
		"firstname": "Alex",
		"lastname": "Morgan"
	},
	"email": "alex@example.com",
	"password": "Password123"
}
```

**Validation requirements:**

- `firstname` and `lastname` must each contain at least 3 characters after trimming.
- `email` must be a valid email address.
- `password` must contain at least 8 characters and at least one number.

**Example response (201 Created):**

```json
{
	"token": "<jwt-token>",
	"user": {
		"_id": "<user-id>",
		"fullname": {
			"firstname": "Alex",
			"lastname": "Morgan"
		},
		"email": "alex@example.com",
		"socketId": null,
		"__v": 0
	}
}
```

The token is also stored in a `token` cookie. The response does not include the hashed password.

### Log in

```http
POST /api/auth/login
```

**Request body:**

```json
{
	"email": "alex@example.com",
	"password": "Password123"
}
```

The password must match the hashed password stored in MongoDB.

**Example response (200 OK):**

```json
{
	"token": "<jwt-token>",
	"user": {
		"_id": "<user-id>",
		"fullname": {
			"firstname": "Alex",
			"lastname": "Morgan"
		},
		"email": "alex@example.com",
		"socketId": null,
		"__v": 0
	}
}
```

A failed login returns:

```http
HTTP/1.1 401 Unauthorized
```

```json
{
	"message": "Invalid email or password"
}
```

### View the user profile

```http
GET /api/auth/profile
```

The request must include a valid JWT through one of these methods:

1. A `token` cookie.
2. An `Authorization` header in the form `Bearer <token>`.

**Example request with a cookie:**

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Cookie: token=<jwt-token>"
```

**Example request with a bearer token:**

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <jwt-token>"
```

**Example response (200 OK):**

```json
{
	"_id": "<user-id>",
	"fullname": {
		"firstname": "Alex",
		"lastname": "Morgan"
	},
	"email": "alex@example.com",
	"socketId": null,
	"__v": 0
}
```

Without a valid token, the endpoint returns:

```json
{
	"message": "Unauthorized"
}
```

### Log out

```http
POST /api/auth/logout
```

The request must include a valid token through the `token` cookie or the `Authorization: Bearer <token>` header. The endpoint clears the cookie and adds the token to the blacklist so it can no longer be used for authenticated requests.

**Example request:**

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer <jwt-token>"
```

**Example response (200 OK):**

```json
{
	"message": "Logged Out"
}
```

Tokens are blacklisted for 24 hours. A blacklisted token returns `401 Unauthorized` when used with a protected route.

## Using the API with curl

### Register a user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com",
    "password": "Password123"
  }'
```

Save the returned `token` value for the next request.

### Log in

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@example.com",
    "password": "Password123"
  }'
```

### Access the profile

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <jwt-token>"
```

### Log out

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer <jwt-token>"
```

## Authentication behavior

- JWTs expire after 24 hours.
- The token must be supplied as a cookie or bearer token for protected routes.
- The `token` cookie is cleared on logout.
- Blacklisted tokens are rejected by the authorization middleware.
- Passwords are hashed with bcrypt using 10 rounds.
- The hashed password is not returned in API responses.

## Project structure

```text
backend/
├── index.js
├── package.json
└── src/
    ├── app.js
    ├── config/
    │   ├── config.js
    │   └── db.config.js
    ├── controllers/
    │   └── auth.controller.js
    ├── middlewares/
    │   ├── authorization.middleware.js
    │   └── validationRules.middleware.js
    ├── models/
    │   ├── blacklistToken.model.js
    │   └── user.model.js
    ├── routes/
    │   └── auth.route.js
    └── services/
        └── user.service.js
```

## Development notes

- The app uses CORS for all origins because `cors()` is configured without options.
- The server currently logs database connection failures but does not stop startup when MongoDB is unavailable.
- The application has no automated test script yet. The package's `test` script is currently a placeholder that exits with an error.
- The API does not currently enforce request rate limits, password reset, email verification, or token rotation.

## Troubleshooting

### MongoDB connection fails

Confirm that MongoDB is running and that `MONGODB_URI` points to a valid MongoDB server. The application logs connection errors to the terminal.

### `401 Unauthorized`

Check that the token is valid, has not expired, and has not been blacklisted. For protected requests, provide the token in either the `token` cookie or an `Authorization: Bearer` header.

### Validation errors

The API returns a `400 Bad Request` with an `errors` array. Check the field-specific messages in the response.

### Server does not start

Run `npm install` again and verify that the required environment variables are present in `backend/.env`.

### Author

## Abdullah Farooqui
