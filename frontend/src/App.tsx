import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box, Card, CardContent } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CodePlayground from './pages/CodePlayground';
import RecommendationsPage from './pages/RecommendationsPage';
import ExplanationAnalysisPage from './pages/ExplanationAnalysisPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const AppBarWithAuth: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Playground', to: '/playground' },
    { label: 'Recommendations', to: '/recommendations' },
    { label: 'Analysis', to: '/explanation' },
    { label: 'Recruiter', to: '/recruiter' },
  ];

  const isActive = (to: string) => location.pathname.startsWith(to);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ background: '#181A1B', color: '#fff', borderBottom: '1px solid #23272A' }}>
      <Toolbar sx={{ minHeight: 70 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CodeIcon sx={{ mr: 2, fontSize: 32, color: '#1976d2' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#fff' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              IIPP
            </Link>
          </Typography>
        </Box>
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navLinks.map(link => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                sx={{
                  borderRadius: 2,
                  px: 2,
                  color: isActive(link.to) ? '#fff' : '#b0b3b8',
                  background: isActive(link.to) ? '#1976d2' : 'transparent',
                  fontWeight: isActive(link.to) ? 700 : 500,
                  boxShadow: isActive(link.to) ? '0 2px 8px rgba(25, 118, 210, 0.12)' : 'none',
                  '&:hover': {
                    background: isActive(link.to) ? '#125ea2' : 'rgba(25, 118, 210, 0.08)',
                    color: '#fff',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button 
              color="inherit" 
              onClick={handleLogout}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                borderColor: '#1976d2',
                color: '#fff',
                '&:hover': { 
                  borderColor: '#64b5f6',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  color: '#1976d2'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                borderColor: '#1976d2',
                color: '#fff',
                '&:hover': { 
                  borderColor: '#64b5f6',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  color: '#1976d2'
                }
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{ 
                borderRadius: 2,
                background: '#1976d2',
                color: '#fff',
                '&:hover': { 
                  background: '#125ea2'
                }
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Code Playground',
      description: 'Practice coding with real-time execution and instant feedback',
      action: () => navigate('/playground')
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'AI Recommendations',
      description: 'Get personalized question recommendations based on your performance',
      action: () => navigate('/recommendations')
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Explanation Analysis',
      description: 'Deep dive into problem explanations with AI-powered insights',
      action: () => navigate('/explanation')
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Learning Dashboard',
      description: 'Track your progress and identify areas for improvement',
      action: () => navigate('/dashboard')
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Recruiter Tools',
      description: 'Advanced analytics and candidate assessment tools',
      action: () => navigate('/recruiter')
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#181A1B', position: 'relative', overflow: 'hidden', py: 8 }}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 2,
              fontWeight: 800,
              color: '#fff',
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-1px',
            }}
          >
            Intelligent Interview Prep Platform
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              color: '#b0b3b8',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.5
            }}
          >
            Master coding interviews with AI-powered practice, personalized recommendations, and comprehensive analytics
          </Typography>
          {!isAuthenticated && (
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{ 
                px: 5, 
                py: 1.5,
                fontSize: '1.1rem',
                background: '#1976d2',
                color: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                textTransform: 'none',
                fontWeight: 700,
                '&:hover': { background: '#125ea2' }
              }}
            >
              Get Started
            </Button>
          )}
        </Box>

        {/* Features Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4 
        }}>
          {features.map((feature, index) => (
            <Card 
              key={index}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                background: '#23272A',
                border: '1px solid #23272A',
                boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
                borderRadius: 3,
                color: '#fff',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
                  borderColor: '#1976d2',
                  transform: 'translateY(-4px) scale(1.03)'
                }
              }}
              onClick={feature.action}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: '#fff' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b3b8', fontSize: '1rem' }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBarWithAuth />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <DashboardPage />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="/playground" element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <CodePlayground />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="/recommendations" element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <RecommendationsPage />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="/explanation" element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <ExplanationAnalysisPage />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="/recruiter" element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <RecruiterDashboard />
              </Container>
            </ProtectedRoute>
          } />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
