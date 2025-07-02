# Intelligent Interview Prep Platform (IIPP)

## 🚀 Overview
A comprehensive, intelligent interview preparation platform that combines DSA, REST API, and ML/NLP capabilities. Built with Python (Flask) backend and React (TypeScript) frontend, featuring a modern dark theme and professional architecture.

## ✨ Features

### For Candidates
- **Practice Coding**: Real-time Python code execution with sandboxing
- **Question Management**: Add, search, and practice with interview questions
- **Smart Recommendations**: ML-based question suggestions
- **Explanation Analysis**: NLP-powered feedback on written explanations
- **Progress Tracking**: Monitor your interview preparation journey

### For Recruiters
- **Question Bank Management**: Create and manage interview questions
- **Analytics Dashboard**: Track candidate performance and question usage
- **Candidate Scoring**: Automated evaluation and insights
- **Topic Management**: Organize questions by difficulty and topics

### Technical Features
- **DSA Integration**: Trie-based search, PriorityQueue ranking, Graph topic mapping
- **Secure Authentication**: JWT-based user management
- **Real-time Code Execution**: Safe Python code execution
- **ML/NLP Capabilities**: Recommendations and semantic analysis
- **Responsive Design**: Works on desktop and mobile
- **Dark Theme**: Modern, eye-friendly interface

## 🏗️ Architecture

```
project/
├── backend/                 # Flask REST API
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # Database models
│   │   ├── services/       # DSA, ML, NLP logic
│   │   └── schemas/        # Data validation
│   └── requirements.txt
├── frontend/               # React TypeScript App
│   ├── src/
│   │   ├── pages/          # Route components
│   │   ├── components/     # Reusable UI
│   │   ├── hooks/          # Custom hooks
│   │   └── api/            # API integration
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Python 3.8+** - Core language
- **Flask** - Web framework
- **Flask-SQLAlchemy** - Database ORM
- **Flask-JWT-Extended** - Authentication
- **Marshmallow** - Serialization
- **scikit-learn/spaCy** - ML/NLP (optional)

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material UI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Clone and Setup
```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access the Platform
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Questions
- `GET /api/questions/` - List questions
- `POST /api/questions/` - Add question
- `GET /api/questions/search?q=<prefix>` - Search (Trie-based)

### Code Execution
- `POST /api/submissions/execute` - Execute Python code

### ML/NLP
- `GET /api/recommendations/` - Get recommendations
- `POST /api/explanations/analyze` - Analyze explanations

### Analytics
- `GET /api/analytics/questions` - Question analytics
- `GET /api/analytics/candidates` - Candidate analytics

## 🔧 Development

### Backend Development
```bash
cd backend
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python run.py

# Run tests
pytest tests/
```

### Frontend Development
```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🚀 Deployment

### Backend Deployment
1. Use Gunicorn for production WSGI server
2. Set up Nginx reverse proxy
3. Use PostgreSQL for production database
4. Configure environment variables
5. Enable HTTPS

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, AWS S3)
3. Configure environment variables
4. Set up custom domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Flask community for the excellent web framework
- Material UI team for the beautiful component library
- React team for the amazing frontend framework

---

**Built with ❤️ for the developer community** 