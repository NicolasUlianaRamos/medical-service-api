# Medical Service API

This is the backend API for the **Medical Service** web application. The API manages the data and functionality needed for the medical service platform, providing endpoints for user authentication, service requests, and other features.

## Features

- User authentication and authorization.
- Data management for medical services.
- RESTful API structure.
- Environment configuration through `.env` files.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and service data.
- **JWT**: JSON Web Token for handling authentication.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB instance running.
- Basic knowledge of RESTful APIs.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/NicolasUlianaRamos/medical-service-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd medical-service-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file based on `.env.example` and configure your environment variables.

5. Start the development server:
    ```bash
    npm start
    ```

## API Endpoints

Here are some key endpoints:

- **POST** `/api/auth/login`: Authenticate users.
- **POST** `/api/auth/register`: Register a new user.
- **GET** `/api/services`: Get available medical services.
- **POST** `/api/appointments`: Book an appointment.

## Environment Variables

The API uses the following environment variables:

- `MONGO_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `PORT`: Port on which the server runs.

## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode with hot reloading.

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For issues or contributions, please open an issue on the [GitHub repository](https://github.com/NicolasUlianaRamos/medical-service-api/issues).
