# Smart Asset & Inventory Management System — Frontend

React frontend for the Smart Asset & Inventory Management System.

## Technologies

* React
* React Router
* Redux Toolkit
* Axios
* Recharts
* CSS
* Docker
* NGINX
* Render

## Features

* User login
* Admin and Employee access
* Dashboard
* Asset management
* Inventory management
* Asset assignments
* Repair tickets
* User profile
* AI Assistant
* Responsive interface
* Dashboard charts
* Django REST API integration
* JWT authentication
* Production deployment on Render

## Pages

### Login

Users can log in using their system credentials.

### Dashboard

Displays asset statistics and charts, including:

* Total assets
* Assigned assets
* Available assets
* Assets under repair

### Assets

Displays the asset list and management interface.

Admins can add, edit and delete assets.

Employees have read-only access.

### Inventory

Displays inventory items and their quantities.

### Assignments

Displays assets assigned to employees.

### Tickets

Displays repair tickets and their current status.

### Profile

Displays the logged-in user's profile information.

### AI Assistant

Provides an interface for interacting with the Gemini-powered AI Assistant.

It supports:

* Sending prompts
* Receiving AI responses
* Creating new conversations
* Viewing previous conversations
* Chat history

## State Management

Redux Toolkit is used for frontend state management.

The project includes Redux slices for application data such as assets and tickets.

## API Integration

Axios is used to communicate with the Django REST API backend.

JWT access tokens are used for authenticated API requests.

Backend API:

https://asset-management-backend-s6nx.onrender.com

## Docker

The frontend uses a multi-stage Docker build.

The React application is built using Node.js and then served using NGINX.

### Build

```bash
docker build -t asset-management-frontend .
```

### Run

```bash
docker run -p 3000:80 asset-management-frontend
```

The application will be available at:

```text
http://localhost:3000
```

## Production Deployment

The frontend is deployed on Render.

Frontend:

https://asset-management-frontend-vftp.onrender.com

The repository is connected to GitHub for automatic deployment when changes are pushed to the configured branch.

## Project Structure

```text
src/
├── api/
│   └── api.js
│
├── components/
│   ├── Navbar.js
│   ├── Sidebar.js
│   ├── Table.js
│   └── Form.js
│
├── pages/
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Assets.js
│   ├── Inventory.js
│   ├── Assignments.js
│   ├── Tickets.js
│   ├── Profile.js
│   └── AIAssistant.js
│
├── data/
│   └── mockData.js
│
├── store/
│   ├── store.js
│   ├── assetsSlice.js
│   └── ticketsSlice.js
│
├── App.js
├── App.css
└── index.js
```

## Project Status

The React frontend is integrated with the Django REST API, Dockerized, deployed on Render, and connected to the production backend.
