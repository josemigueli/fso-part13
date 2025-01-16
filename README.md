# Blogs API

This repository contains the backend implementation for the **Blogs API**, a Node.js application designed to manage blog posts, users, and related functionality. The API provides endpoints for creating, retrieving, updating, and deleting blogs, as well as managing user authentication, reading lists, and user sessions. This application was developed as part of the Full Stack Open course. You can see more here: https://fullstackopen.com/en/part13.

## Features

### Blog Management

- **Create, Read, Update, Delete (CRUD)** functionality for blogs.
- Search blogs by title or author.
- Track the number of likes for each blog.

### User Authentication

- JWT-based authentication system.
- Secure password storage using bcrypt.
- User login, logout, and session management.

### Reading Lists

- Add blogs to user-specific reading lists.
- Mark items in reading lists as read or unread.
- Retrieve user reading lists with detailed information.

### Authors

- Retrieve aggregated statistics of blog authors, including the number of articles and total likes.

## Project Structure

```
blogs/
├── src/
│   ├── controllers/
│   │   ├── authors.js
│   │   ├── blogs.js
│   │   ├── login.js
│   │   ├── logout.js
│   │   ├── reading_lists.js
│   │   └── users.js
│   ├── migrations/       # Database migrations
│   ├── models/           # Sequelize models for database tables
│   │   ├── blog.js
│   │   ├── index.js
│   │   ├── reading_list_item.js
│   │   ├── reading_list.js
│   │   ├── session.js
│   │   ├── user.js
│   ├── util/
│   │   ├── config.js     # Environment variable configuration
│   │   ├── db.js         # Databse configuration
│   │   ├── middleware.js # Middleware for request handling
│   │   └── rollback.js   # Script for database migrations
│   ├── index.js          # Application entry point
├── .env                  # Environment variables
├── .env.example          # Example of environment variables
├── commands.sql          # SQL commands used to add data to the database
├── package-lock.json
├── package.json
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/josemigueli/fso-part13.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blogs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the `.env` file with the required environment variables:
   ```env
   DATABASE_URL=your_database_url
   SECRET=your_jwt_secret
   ```
5. Run database migrations if necessary:
   ```bash
   npm run migration:down
   ```

## Usage

### Start the Server

For production:

```bash
npm start
```

For development (with file watching):

```bash
npm run dev
```

### API Endpoints

#### Blogs

- `GET /blogs`: Retrieve all blogs, with optional search functionality.
- `POST /blogs`: Create a new blog (authenticated users only).
- `PUT /blogs/:id`: Update the number of likes for a specific blog.
- `DELETE /blogs/:id`: Delete a specific blog (owner only).

#### Authors

- `GET /authors`: Retrieve statistics for all blog authors.

#### Users

- `GET /users`: Retrieve all users with their blogs.
- `GET /users/:id`: Retrieve a specific user's reading list.
- `POST /users`: Create a new user.
- `PUT /users/:username`: Update a user's information (authenticated users only).

#### Reading Lists

- `GET /readinglists`: Retrieve all reading lists.
- `PUT /readinglists/:id`: Mark a blog in the reading list as read or unread (authenticated users only).

#### Authentication

- `POST /login`: Log in to retrieve a JWT token.
- `DELETE /logout`: Log out and invalidate the session.

### Error Handling

The API includes a comprehensive error-handling mechanism to provide meaningful error messages, including:

- Validation errors (e.g., invalid email, required fields).
- Authentication errors (e.g., invalid or expired tokens).
- Resource-specific errors (e.g., not found, unauthorized access).

## Dependencies

The project relies on the following key packages:

- **express**: Web framework for building the API.
- **sequelize**: ORM for managing database operations.
- **pg**: PostgreSQL client for database connectivity.
- **bcrypt**: For secure password hashing.
- **jsonwebtoken**: For handling JWT-based authentication.
- **umzug**: For managing database migrations.

## License

This project is licensed under the ISC License.

## Author

Developed by Miguel Osorio.

