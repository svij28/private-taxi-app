# Private Taxi App

This is a simple web application for requesting a taxi ride. It consists of a React frontend and a Python (Flask) backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Python and pip](https://www.python.org/downloads/)
- [Node.js and npm](https://nodejs.org/en/)
- A [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the **Places API** enabled.

## Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/svij28/private-taxi-app.git
cd private-taxi-app
```

### 2. Backend Setup

Navigate to the backend directory and install the required Python packages. It's recommended to use a virtual environment.

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

Navigate to the frontend directory and install the required Node.js packages.

```bash
# From the root directory
cd frontend
npm install
```

After installation, you need to configure your Google Maps API key. Open `frontend/src/App.js` and replace the placeholder string "YOUR_GOOGLE_MAPS_API_KEY" with your actual API key.

```javascript
// In frontend/src/App.js
<LoadScript
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // <-- REPLACE THIS
  libraries={libraries}
>
```

## Running the Application

You will need to run both the backend and frontend servers simultaneously in separate terminal windows.

### 1. Run the Backend (Flask)

In the `backend` directory (with your virtual environment activated), run the following command to start the Flask server.

```bash
flask run
```
The backend will typically be available at `http://127.0.0.1:5000`.

### 2. Run the Frontend (React)

In the `frontend` directory, run the following command to start the React development server.

```bash
npm start
```
The frontend will open automatically in your browser, usually at `http://localhost:3000`.

Once both services are running, you can use the application.
