# Intelligent Interview Prep Platform (IIPP) - Frontend

## Overview
A modern, responsive frontend for the Intelligent Interview Prep Platform, built with React, TypeScript, and Material UI. Features a dark theme, real-time code execution, and comprehensive interview preparation tools.

## Features
- **Authentication**: Secure login/register with JWT
- **Dashboard**: Question management with search and CRUD
- **Code Playground**: Real-time Python code execution
- **ML/NLP**: Question recommendations and explanation analysis
- **Recruiter Tools**: Analytics dashboard and question bank management
- **Dark Theme**: Modern, eye-friendly interface
- **Responsive Design**: Works on desktop and mobile

## Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hooks** - State management

## Project Structure
```
frontend/
├── src/
│   ├── api/                # API calls (Axios)
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route-level pages
│   ├── theme/              # Material UI theme config
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── public/                 # Static assets
├── package.json            # Dependencies
└── tsconfig.json          # TypeScript config
```

## Quickstart

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Set Environment Variables
Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Available Pages

### Public Pages
- **Home** (`/`) - Landing page
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages (Require Authentication)
- **Dashboard** (`/dashboard`) - Question management
- **Code Playground** (`/playground`) - Code execution
- **Recommendations** (`/recommendations`) - ML-based suggestions
- **Explanation Analysis** (`/explanation`) - NLP feedback
- **Recruiter Tools** (`/recruiter`) - Analytics and management

## Key Components

### Authentication
- `useAuth` hook for JWT management
- `ProtectedRoute` for route protection
- Automatic redirect on login/logout

### Code Execution
- Real-time Python code execution
- Input/output handling
- Error display and syntax highlighting

### Question Management
- Add, edit, delete questions
- Trie-based search with autocomplete
- Difficulty and tag filtering

## Development

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Code Style
- Use TypeScript for all components
- Follow React best practices
- Use Material UI components consistently
- Implement proper error handling

## Deployment

### Production Build
```bash
npm run build
```

### Static Hosting
The build folder can be deployed to:
- Netlify
- Vercel
- AWS S3
- GitHub Pages

### Environment Configuration
Set production environment variables:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## API Integration

### Backend Requirements
- Flask backend running on port 5000
- CORS enabled for localhost:3000
- JWT authentication endpoints

### Error Handling
- Network error handling
- API error display
- Loading states for all async operations

## Contributing
1. Follow TypeScript best practices
2. Use Material UI components
3. Add proper error handling
4. Test on different screen sizes
5. Update documentation

## Troubleshooting

### Common Issues
- **Build errors**: Check TypeScript compilation
- **API errors**: Verify backend is running
- **Styling issues**: Check Material UI theme
- **Routing issues**: Verify React Router setup

### Performance
- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting

## License
MIT License
