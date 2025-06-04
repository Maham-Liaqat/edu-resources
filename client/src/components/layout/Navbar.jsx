// src/components/layout/Navbar.jsx
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Menu, 
  MenuItem,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

// Import your logo (make sure to add the image file to your assets)
import logo from '../../assets/images/ilmzone-logo).jpg';

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  const classes = ['Class 9', 'Class 10', 'FSc Part 1', 'FSc Part 2'];

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

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo instead of text */}
        <Box 
          component={Link} 
          to="/"
          sx={{ 
            height: 60,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img 
            src={logo} 
            alt="IlmZone Logo" 
            style={{ height: '100%', objectFit: 'contain' }}
          />
        </Box>
        
        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button onClick={() => navigate('/')}>Home</Button>
          <Button onClick={() => navigate('/about')}>About</Button>
          
          {/* Textbooks Dropdown */}
          <Button 
            onClick={(e) => handleMenuOpen(e, 'textbooks')}
            sx={{ color: 'primary.main' }}
          >
            Textbooks
          </Button>
          
          <Button onClick={() => navigate('/notes')}>Notes</Button>
          <Button onClick={() => navigate('/past-papers')}>Past Papers</Button>
          <Button onClick={() => navigate('/contact')}>Contact</Button>
        </Box>

        {/* Mobile menu button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: 'none' }, color: 'primary.main' }}
          onClick={(e) => handleMenuOpen(e, 'mobile')}
        >
          <MenuIcon />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {currentMenu === 'mobile' && (
            <>
              <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/about')}>About</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/textbooks')}>Textbooks</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/notes')}>Notes</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/past-papers')}>Past Papers</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('/contact')}>Contact</MenuItem>
            </>
          )}
          
          {currentMenu === 'textbooks' && (
            classes.map((cls) => (
              <MenuItem 
                key={cls} 
                onClick={() => handleMenuItemClick(
                  `/textbooks/${cls.toLowerCase().replace(' ', '-')}`
                )}
              >
                {cls}
              </MenuItem>
            ))
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}