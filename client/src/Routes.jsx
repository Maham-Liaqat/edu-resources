import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Class9 from './pages/resources/Class9';
import Class10 from './pages/resources/Class10';
import FscPart1 from './pages/resources/FscPart1';
import FscPart2 from './pages/resources/FscPart2';
import Textbooks from './pages/resources/Textbooks';
import Notes from './pages/resources/Notes';
import PastPapers from './pages/resources/PastPapers';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Upload from './pages/Upload';
import AdminLogin from './pages/AdminLogin';

export default function AppRoutes() {
  return (
    <Routes>
   
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/upload" element={<Upload />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/search" element={<Search />} />
  
      
      {/* Main Resource Type Categories */}
      <Route path="/textbooks" element={<Textbooks />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/past-papers" element={<PastPapers />} />
      
      {/* Class-Specific Routes */}
      <Route path="/class-9" element={<Class9 />} />
      <Route path="/class-10" element={<Class10 />} />
      <Route path="/fsc-part-1" element={<FscPart1 />} />
      <Route path="/fsc-part-2" element={<FscPart2 />} />
      
      {/* Combined Class + Type Routes */}
      <Route path="/textbooks/class-9" element={<Class9 resourceType="textbook" />} />
      <Route path="/textbooks/class-10" element={<Class10 resourceType="textbook" />} />
      <Route path="/textbooks/fsc-part-1" element={<FscPart1 resourceType="textbook" />} />
      <Route path="/textbooks/fsc-part-2" element={<FscPart2 resourceType="textbook" />} />
      
      <Route path="/notes/class-9" element={<Class9 resourceType="notes" />} />
      <Route path="/notes/class-10" element={<Class10 resourceType="notes" />} />
      <Route path="/notes/fsc-part-1" element={<FscPart1 resourceType="notes" />} />
      <Route path="/notes/fsc-part-2" element={<FscPart2 resourceType="notes" />} />
      
      <Route path="/past-papers/class-9" element={<Class9 resourceType="past-paper" />} />
      <Route path="/past-papers/class-10" element={<Class10 resourceType="past-paper" />} />
      <Route path="/past-papers/fsc-part-1" element={<FscPart1 resourceType="past-paper" />} />
      <Route path="/past-papers/fsc-part-2" element={<FscPart2 resourceType="past-paper" />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}