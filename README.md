# rest-app-netlify

This project demonstrates a Node.js application using SQLite and Sequelize to set up a many-to-many relationship between `User` and `Role` models.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   node app.js
   ```

## Endpoints

- `GET /users` - Fetch all users with their associated roles.
- `GET /roles` - Fetch all roles with their associated users.
