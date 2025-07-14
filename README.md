# EMOSENSE - Depression Detection Web Application

EMOSENSE is a web-based application that analyzes text to predict the likelihood of depression using natural language processing (NLP) techniques. The goal is to provide users with an easy-to-use tool for self-assessment and awareness.

## Features

- Analyze user-submitted text for depressive tendencies
- Real-time result feedback
- Built with modern frontend tools (React + Vite + TailwindCSS)
- Backend API integration for ML-based prediction
- Secure and modular code structure

## Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  

### NLP & ML
- Python + Flask (assumed for model prediction)
- Pretrained NLP models (e.g., Scikit-learn, NLTK, or Transformers)

## Getting Started

Follow these steps to set up and run the EMOSENSE application locally.

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** or **Yarn** (comes with Node.js)
* **Python 3.x**
* **pip** (Python package installer)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rlanx/EMOSENSE.git](https://github.com/rlanx/EMOSENSE.git
    cd EMOSENSE
    ```

2.  **Install Client Dependencies:**
    ```bash
    cd ../../client
    npm install
    ```

3.  **Install Backend Service Dependencies:**
    ```bash
    cd server/backend_service
    npm install
    ```

4.  **Install ML Service Dependencies:**
    ```bash
    cd ../ml_service
    pip install -r requirements.txt
    ```

#### Backend Service (`server/backend_service`)
Create a `.env` file in the `server/backend_service` directory with the following environment variables. Adjust values as needed:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/emosense_db_name # Replace with your MongoDB connection string
JWT_SECRET=your_jwt_secret_key_here # Use a strong, random string for production
```

## Running the Application

You'll need to run each part of the application (ML Service, Backend Service, and Client) in separate terminal windows.

1.  **Start the Client (Frontend):**
    ```bash
    git clone https://github.com/rlanx/EMOSENSE.git](https://github.com/rlanx/EMOSENSE.git
    cd EMOSENSE
    ```

2.  **Start the Backend Service:**
    ```bash
    cd server/backend_service
    npm start
    ```

3.  **Start the ML Service:**
    ```bash
    cd server/ml_service
    python app.py
    ```
    
After all services are running, open your web browser and visit the address provided by the client (usually http://localhost:5173 or similar, as indicated by Vite in your terminal).

## Usage

EMOSENSE allows users to submit text for emotion analysis.

1. **Access the application:** Open http://localhost:5173 in your browser.

2. **Login/Register:** (If applicable, based on user/admin structure).

3. **Navigate to Emotion Analysis:** Look for a section or input field where you can paste or type text.

4. **Submit Text:** Enter your desired text and submit it for analysis.

5. **View Results:** The application will display the predicted emotion(s) and potentially a confidence score.

## License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this code for personal or commercial purposes.  
Please include proper attribution to the original author.

See the full license in the [LICENSE](./LICENSE) file.
