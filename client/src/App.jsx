import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'

const theme = createTheme({
  palette: {
    primary: { main: '#2C3E50' },
    secondary: { main: '#3498DB' },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App