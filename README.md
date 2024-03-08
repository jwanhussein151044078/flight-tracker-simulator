# Flight Tracker Simulator

Flight Tracker Simulator is a web application built to simulate real-time flight tracking using React for the frontend, Node.js Express server for the backend, Socket.IO for real-time communication, and a RESTful API for data retrieval. The project utilizes a PostgreSQL database with the PostGIS extension to store spatial data.

## Technologies Used

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - Socket.IO Client: WebSocket library for real-time communication between the frontend and backend.
  - Axios: Promise-based HTTP client for making requests to the backend RESTful API.
  - Mapbox: Interactive mapping platform for visualizing flight paths and geographical data.

- **Backend**:
  - Node.js: JavaScript runtime for building server-side applications.
  - Express.js: Web application framework for Node.js, used for building RESTful APIs.
  - Socket.IO: Real-time engine for bi-directional communication between clients and server.
  - PostgreSQL: Open-source relational database management system.
  - PostGIS: Spatial database extender for PostgreSQL, used for storing and querying geographic data.
  - Sequelize : Promise-based Node.js ORM for relational databases, used for simplifying database operations and managing database models.

## Features

- Real-time Flight Tracking: Simulates real-time flight tracking by updating flight positions on the map in real-time.
- Interactive Map Interface: Provides an interactive map interface powered by Mapbox for users to visualize flight paths and trails data.
- RESTful API: Exposes RESTful endpoints for retrieving flight data and other relevant information.
- WebSocket Communication: Uses WebSocket communication through Socket.IO for real-time updates.
- PostgreSQL Database: Stores flight , pathes and trails data using the PostgreSQL database with the PostGIS extension.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/your-username/flight-tracker-simulator.git`
2. Install dependencies for frontend and backend:
   - Frontend: `cd react-js-v2 && npm install`
   - Backend: `cd server && npm install`
3. Set up the PostgreSQL database with the PostGIS extension.
4. Create a new schema named `flight_tracker` in your PostgreSQL database.
5. **Configure the database connection in the backend**:
   - In the server project main directory, create a file called `.env`.
   - Add the following environment variables to the `.env` file:
     ```
     DB_NAME="postgres"
     DB_USERNAME="postgres"
     DB_PASSWORD="428997"
     DB_HOST="127.0.0.1"
     DB_PORT="5432"
     ```
6. Run migrations to create tables: `cd server && npx sequelize-cli db:migrate`.
7. Run seeders to populate initial data: `cd server && npx sequelize-cli db:seed:all`.
8. Start the backend server: `cd server && node src/index.js`
9. Start the frontend development server: `cd react-js-v2 && npm start`
10. Access the application in your web browser at `http://localhost:3000`.

## Contributors

- [Jvan Hussein]([https://github.com/your-username](https://github.com/jwanhussein151044078))
