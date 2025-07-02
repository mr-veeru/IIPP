# Intelligent Interview Prep Platform (IIPP) - Backend

## Overview
A scalable, modular REST API for an intelligent interview preparation and recruiter analytics platform. Built with Flask, featuring DSA-powered search, ML/NLP capabilities, and secure code execution.

## Features
- **Authentication**: JWT-based user registration and login
- **Question Management**: CRUD operations with Trie-based search
- **Code Execution**: Safe Python code execution with sandboxing
- **ML/NLP**: Question recommendations and explanation analysis
- **Recruiter Tools**: Analytics, question bank management, candidate scoring
- **DSA Integration**: Trie, PriorityQueue, Graph implementations

## Tech Stack
- **Python 3.8+**
- **Flask** - Web framework
- **Flask-SQLAlchemy** - Database ORM
- **Flask-JWT-Extended** - JWT authentication
- **Marshmallow** - Serialization/validation
- **scikit-learn/spaCy** - ML/NLP (optional)

## Project Structure
```
backend/
├── app/
│   ├── __init__.py                # App factory
│   ├── config.py                  # Configuration settings
│   ├── extensions.py              # Extensions (db, jwt, etc.)
│   ├── models/                    # Database models
│   ├── schemas/                   # Marshmallow schemas
│   ├── api/                       # API endpoints
│   ├── services/                  # Business logic (DSA, ML, NLP)
│   └── utils/                     # Utilities
├── tests/                         # Test suite
├── requirements.txt               # Dependencies
└── run.py                         # Entry point
```

## Quickstart

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Set Environment Variables
```bash
export SECRET_KEY="your-secret-key"
export JWT_SECRET_KEY="your-jwt-secret"
export DATABASE_URL="sqlite:///iipp.db"  # or PostgreSQL URL
```

### 3. Initialize Database
```bash
python -c "from app import create_app; from app.extensions import db; app = create_app(); app.app_context().push(); db.create_all()"
```

### 4. Run the Application
```bash
python run.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Questions
- `GET /api/questions/` - List all questions
- `POST /api/questions/` - Add new question (JWT required)
- `PUT /api/questions/<id>` - Update question (JWT required)
- `DELETE /api/questions/<id>` - Delete question (JWT required)
- `GET /api/questions/search?q=<prefix>` - Search questions (Trie-based)

### Code Execution
- `POST /api/submissions/execute` - Execute Python code safely

### ML/NLP
- `GET /api/recommendations/` - Get question recommendations
- `POST /api/explanations/analyze` - Analyze explanation text

### Analytics (Recruiter)
- `GET /api/analytics/questions` - Question analytics
- `GET /api/analytics/candidates` - Candidate analytics
- `GET /api/analytics/question-bank` - Question bank overview

## DSA Features
- **Trie**: Fast question title search and autocomplete
- **PriorityQueue**: Question ranking by popularity
- **Graph**: Topic prerequisites and recommendations

## Security Features
- JWT authentication for protected endpoints
- Password hashing with Werkzeug
- Input validation with Marshmallow
- Safe code execution with timeout and sandboxing

## Development

### Running Tests
```bash
pytest tests/
```

### Code Style
Follow PEP 8 guidelines and use type hints where appropriate.

## Deployment

### Production Setup
1. Use a production WSGI server (Gunicorn)
2. Set up a reverse proxy (Nginx)
3. Use PostgreSQL for production database
4. Set secure environment variables
5. Enable HTTPS

### Docker Deployment
```bash
docker build -t iipp-backend .
docker run -p 5000:5000 iipp-backend
```

## Contributing
1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Use meaningful commit messages

## License
MIT License
