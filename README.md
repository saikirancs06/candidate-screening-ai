# Candidate Screening AI 🤖

An AI-powered candidate screening application that analyzes PDF resumes against job descriptions, identifies matching and missing skills, calculates a skill-match score, and generates AI-assisted candidate analysis.

## 🚀 Features

- **Resume Upload:** Upload candidate resumes in PDF format.
- **Job Description Analysis:** Compare resume content with job requirements.
- **Skill Matching:** Identify matched and missing skills.
- **Match Score:** Calculate a percentage based on recognized skill matches.
- **AI-Powered Analysis:** Generate an AI-assisted candidate assessment.
- **Input Validation:** Handle missing inputs, invalid file types, and oversized files.
- **Automated Testing:** Test API endpoints and screening functionality.

## 🛠️ Technologies Used

**Frontend**
- React
- Vite
- JavaScript
- React Markdown

**Backend**
- Node.js
- Express.js
- Multer
- PDF parsing
- Groq API

**Testing and Tools**
- Node.js Test Runner
- Supertest
- Git and GitHub

## 📂 Project Structure

```text
candidate-screening-ai/
├── backend/
│   ├── server.js
│   ├── server.test.js
│   ├── sample-resume.pdf
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- A Groq API key for AI-powered analysis

### 1. Clone the repository

```bash
git clone https://github.com/saikirancs06/candidate-screening-ai.git
cd candidate-screening-ai
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

Replace `your_groq_api_key` with your own API key. Never commit this file to GitHub.

Start the backend:

```bash
node server.js
```

The API should run at `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 🔌 API Endpoint

**POST** `/api/screen`

Accepts a PDF resume and a job description for screening.

The response includes:
- Match score
- Matched skills
- Missing skills
- Screening summary
- AI analysis and status

The backend runs locally at `http://localhost:5000` by default.

## 🧪 Run Automated Tests

From the backend directory:

```bash
npm test
```

The project includes automated tests for API health, input validation, file type validation, file size limits, and successful resume screening.

## 🔐 Security

- Store API credentials in environment variables.
- Do not upload `.env` files or API keys.
- Validate uploaded files before processing.
- Keep dependencies and generated build files out of version control where appropriate.

## 🎯 Project Objective

This project demonstrates full-stack application development, REST API integration, PDF processing, rule-based skill matching, AI integration, and automated backend testing.

## 👨‍💻 Author

**C S Sai Kiran**

GitHub: [@saikirancs06](https://github.com/saikirancs06)

---

*Developed as a portfolio project to explore AI-assisted recruitment and resume screening.*
