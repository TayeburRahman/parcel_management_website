# Backend Setup and Usage

This document outlines the steps to set up and run the backend for the Parcel Management System.

## Project Setup

1.  **Install Dependencies**:
    Navigate to the `backend` directory and install the necessary Node.js packages:

    ```bash
    npm install
    ```

2.  **Environment Variables (`.env`)**:
    Create a `.env` file in the `backend` directory. This file will store sensitive information and configuration variables. You will need to populate this file with your specific environment variables (e.g., database connection strings, JWT secrets, port numbers).

    Example (replace with your actual values):

    ```
    PORT=4000
    DATABASE_URL=your_database_connection_string
    JWT_SECRET=your_jwt_secret
    # Add other necessary environment variables here
    ```

3.  **CORS Configuration**:
    The backend is configured to handle Cross-Origin Resource Sharing (CORS). The `src/app.ts` file already includes configurations for `http://localhost:3000` and `http://13.51.233.34:4000`. If your frontend is hosted on a different URL, you may need to add it to the `cors` origin list in `src/app.ts`.

## Running the Backend

To start the backend server, run the following command from the `backend` directory:

```bash
npm start
```

The backend will typically run on port `4000`.

## Live Deployment In AWS

The live website is hosted at: `http://13.51.233.34:4000`

## Test Credentials (for development/testing purposes)

- **Admin**: `admin@gmail.com` / `12345678`
- **Agent**: `agent@gmail.com` / `12345678`
- **Customer**: `tayebrayhan101@gmail.com` / `12345678`
