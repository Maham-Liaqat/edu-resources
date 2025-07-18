// src/components/layout/Navbar.jsx
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Menu, 
  MenuItem,
  IconButton,
  Typography,
  Container,
  Chip
} from '@mui/material';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import { 
  School as SchoolIcon,
  Book as BookIcon,
  Description as NotesIcon,
  Assignment as PastPapersIcon,
  MenuBook as SyllabusIcon
} from '@mui/icons-material';
import { UserContext } from '../../contexts/UserContext';

// Import your logo
import logo from '../../assets/images/ilmzone-logo).jpg';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  // Class-based navigation
  const classes = [
    { name: 'Class 9', path: '/class-9', icon: <SchoolIcon fontSize="small" /> },
    { name: 'Class 10', path: '/class-10', icon: <SchoolIcon fontSize="small" /> },
    { name: 'FSc Part 1', path: '/fsc-part-1', icon: <SchoolIcon fontSize="small" /> },
    { name: 'FSc Part 2', path: '/fsc-part-2', icon: <SchoolIcon fontSize="small" /> }
  ];

  // Resource type navigation
  const resourceTypes = [
    { name: 'Textbooks', path: '/textbooks', icon: <BookIcon fontSize="small" /> },
    { name: 'Notes', path: '/notes', icon: <NotesIcon fontSize="small" /> },
    { name: 'Syllabus', path: '/syllabus', icon: <SyllabusIcon fontSize="small" /> },
    { name: 'Past Papers', path: '/past-papers', icon: <PastPapersIcon fontSize="small" /> }
  ];

  const handleMenuOpen = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: '#FFFFFF', color: '#000000', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
          {/* Logo */}
        <Box 
          component={Link} 
          to="/"
          sx={{ 
            height: 48,
            display: 'flex',
              alignItems: 'center',
            textDecoration: 'none',
            mr: 3
          }}
        >
          <img 
            src={logo} 
            alt="IlmZone Logo" 
            style={{ height: 40, width: 'auto', objectFit: 'contain', background: 'transparent', borderRadius: 8 }}
          />
        </Box>
        
        {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
            {/* Home */}
            <Button 
              onClick={() => navigate('/')}
              sx={{ 
                color: isActive('/') ? '#28A745' : '#000000',
                fontWeight: isActive('/') ? 700 : 400,
                '&:hover': { color: '#28A745' }
              }}
            >
              Home
            </Button>
          
            {/* Classes Dropdown */}
          <Button 
              onClick={(e) => handleMenuOpen(e, 'classes')}
              sx={{ 
              color: isActive('/class-') || isActive('/fsc-') ? '#28A745' : '#000000',
              fontWeight: (isActive('/class-') || isActive('/fsc-')) ? 700 : 400,
              '&:hover': { color: '#28A745' }
              }}
            startIcon={<SchoolIcon sx={{ color: isActive('/class-') || isActive('/fsc-') ? '#28A745' : '#000000' }} />}
            >
              Classes
          </Button>
          
            {/* Resource Types */}
            {resourceTypes.map((resource) => (
              <Button
                key={resource.name}
                onClick={() => navigate(resource.path)}
                startIcon={resource.icon}
                sx={{ 
                  color: isActive(resource.path) ? '#28A745' : '#000000',
                  fontWeight: isActive(resource.path) ? 700 : 400,
                  '&:hover': { color: '#28A745' }
                }}
              >
                {resource.name}
              </Button>
            ))}

            {/* About & Contact */}
            <Button 
              onClick={() => navigate('/about')}
              sx={{ 
                color: isActive('/about') ? '#28A745' : '#000000',
                fontWeight: isActive('/about') ? 700 : 400,
                '&:hover': { color: '#28A745' }
              }}
            >
              About
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              sx={{ 
                color: isActive('/contact') ? '#28A745' : '#000000',
                fontWeight: isActive('/contact') ? 700 : 400,
                '&:hover': { color: '#28A745' }
              }}
            >
              Contact
            </Button>
            {!isLoggedIn ? (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  variant="outlined"
                  sx={{ ml: 2, fontWeight: 600, borderRadius: 2, px: 2, color: '#28A745', borderColor: '#28A745', '&:hover': { bgcolor: '#F5F5F5', color: '#218838', borderColor: '#218838' } }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  sx={{ ml: 1, fontWeight: 600, borderRadius: 2, px: 2, boxShadow: 2, bgcolor: '#28A745', color: '#fff', '&:hover': { bgcolor: '#218838' } }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Chip
                  label={`Welcome, ${user?.name || 'User'}`}
                  sx={{ ml: 2, fontWeight: 600, fontSize: 16, px: 2, bgcolor: '#F5F5F5', color: '#28A745' }}
                />
                <Button
                  variant="outlined"
                  sx={{ ml: 2, fontWeight: 600, borderRadius: 2, px: 2, color: '#28A745', borderColor: '#28A745', '&:hover': { bgcolor: '#F5F5F5', color: '#218838', borderColor: '#218838' } }}
                  onClick={() => { logout(); navigate('/'); }}
                >
                  Logout
                </Button>
              </>
            )}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
            sx={{ display: { lg: 'none' }, color: 'primary.main' }}
          onClick={(e) => handleMenuOpen(e, 'mobile')}
        >
          <MenuIcon />
        </IconButton>

          {/* Dropdown Menus */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                borderRadius: 2
              }
            }}
        >
          {currentMenu === 'mobile' && (
            <>
                <MenuItem onClick={() => handleMenuItemClick('/')}> 
                  <Typography>Home</Typography>
                </MenuItem>
                {/* Classes Section */}
                <MenuItem disabled>
                  <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                    Classes
                  </Typography>
                </MenuItem>
                {classes.map((cls) => (
                  <MenuItem 
                    key={cls.name} 
                    onClick={() => handleMenuItemClick(cls.path)}
                    sx={{ pl: 3 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {cls.icon}
                      <Typography>{cls.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
                {/* Resource Types Section */}
                <MenuItem disabled>
                  <Typography variant="subtitle2" color="primary.main" fontWeight={600}>
                    Resources
                  </Typography>
                </MenuItem>
                {resourceTypes.map((resource) => (
                  <MenuItem 
                    key={resource.name} 
                    onClick={() => handleMenuItemClick(resource.path)}
                    sx={{ pl: 3 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {resource.icon}
                      <Typography>{resource.name}</Typography>
                    </Box>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => handleMenuItemClick('/about')}>
                  <Typography>About</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/contact')}>
                  <Typography>Contact</Typography>
                </MenuItem>
                {/* Auth section for mobile */}
                {!isLoggedIn ? (
                  <>
                    <MenuItem onClick={() => handleMenuItemClick('/login')}>
                      <Typography color="primary">Login</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/register')}>
                      <Typography color="primary">Register</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem disabled>
                      <Chip
                        label={`Welcome, ${user?.name || 'User'}`}
                        color="primary"
                        sx={{ fontWeight: 600, fontSize: 16, px: 2, bgcolor: 'primary.light', color: 'primary.dark' }}
                      />
                    </MenuItem>
                    <MenuItem onClick={() => { logout(); navigate('/'); handleMenuClose(); }}>
                      <Typography color="secondary">Logout</Typography>
                    </MenuItem>
                  </>
                )}
            </>
          )}
          
            {currentMenu === 'classes' && (
            classes.map((cls) => (
              <MenuItem 
                  key={cls.name} 
                  onClick={() => handleMenuItemClick(cls.path)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {cls.icon}
                    <Typography>{cls.name}</Typography>
                  </Box>
              </MenuItem>
            ))
          )}
        </Menu>
      </Toolbar>
      </Container>
    </AppBar>
  );
}