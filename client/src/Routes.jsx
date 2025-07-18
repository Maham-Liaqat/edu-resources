// src/Routes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Class9 from './pages/resources/Class9';
import Class10 from './pages/resources/Class10';
import FscPart1 from './pages/resources/FscPart1';
import FscPart2 from './pages/resources/FscPart2';
import Textbooks from './pages/resources/textbooks';
import Notes from './pages/resources/Notes';
import Syllabus from './pages/resources/Syllabus';
import PastPapers from './pages/resources/PastPapers';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Upload from './pages/Upload';
import AdminLogin from './pages/AdminLogin';
import ResourceDetail from './pages/resources/ResourceDetail';
import SubjectResourceList from './pages/resources/SubjectResourceList';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LoadingScreen from './components/ui/LoadingScreen';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/search" element={<Search />} />
      
      {/* Class-based Routes */}
      <Route path="/class-9" element={<Class9 />} />
      <Route path="/class-10" element={<Class10 />} />
      <Route path="/fsc-part-1" element={<FscPart1 />} />
      <Route path="/fsc-part-2" element={<FscPart2 />} />

      {/* Resource Type Categories */}
      <Route path="/textbooks" element={<Textbooks />} />
      <Route path="/textbooks/:level" element={<Textbooks />} />
      <Route path="/textbooks/class-9" element={<SubjectResourceList resourceType="textbooks" level="class-9" />} />
      <Route path="/textbooks/class-10" element={<SubjectResourceList resourceType="textbooks" level="class-10" />} />
      <Route path="/textbooks/fsc-part-1" element={<SubjectResourceList resourceType="textbooks" level="fsc-part-1" />} />
      <Route path="/textbooks/fsc-part-2" element={<SubjectResourceList resourceType="textbooks" level="fsc-part-2" />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/class-9" element={<SubjectResourceList resourceType="notes" level="class-9" />} />
      <Route path="/notes/class-10" element={<SubjectResourceList resourceType="notes" level="class-10" />} />
      <Route path="/notes/fsc-part-1" element={<SubjectResourceList resourceType="notes" level="fsc-part-1" />} />
      <Route path="/notes/fsc-part-2" element={<SubjectResourceList resourceType="notes" level="fsc-part-2" />} />
      <Route path="/notes/:subject" element={<SubjectResourceList resourceType="notes" />} />
      <Route path="/textbooks/class-9/:subject" element={<SubjectResourceList resourceType="textbooks" level="class-9" />} />
      <Route path="/textbooks/class-10/:subject" element={<SubjectResourceList resourceType="textbooks" level="class-10" />} />
      <Route path="/textbooks/fsc-part-1/:subject" element={<SubjectResourceList resourceType="textbooks" level="fsc-part-1" />} />
      <Route path="/textbooks/fsc-part-2/:subject" element={<SubjectResourceList resourceType="textbooks" level="fsc-part-2" />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="/syllabus/:subject" element={<SubjectResourceList resourceType="syllabus" />} />
      <Route path="/syllabus/:level" element={<Syllabus />} />
      <Route path="/syllabus/class-9" element={<SubjectResourceList resourceType="syllabus" level="class-9" />} />
      <Route path="/syllabus/class-10" element={<SubjectResourceList resourceType="syllabus" level="class-10" />} />
      <Route path="/syllabus/fsc-part-1" element={<SubjectResourceList resourceType="syllabus" level="fsc-part-1" />} />
      <Route path="/syllabus/fsc-part-2" element={<SubjectResourceList resourceType="syllabus" level="fsc-part-2" />} />
      <Route path="/syllabus/class-9/:subject" element={<SubjectResourceList resourceType="syllabus" level="class-9" />} />
      <Route path="/syllabus/class-10/:subject" element={<SubjectResourceList resourceType="syllabus" level="class-10" />} />
      <Route path="/syllabus/fsc-part-1/:subject" element={<SubjectResourceList resourceType="syllabus" level="fsc-part-1" />} />
      <Route path="/syllabus/fsc-part-2/:subject" element={<SubjectResourceList resourceType="syllabus" level="fsc-part-2" />} />
      <Route path="/past-papers" element={<PastPapers />} />
      <Route path="/past-papers/:subject" element={<SubjectResourceList resourceType="past-papers" />} />
      <Route path="/past-papers/:level" element={<PastPapers />} />
      <Route path="/past-papers/class-9" element={<SubjectResourceList resourceType="past-papers" level="class-9" />} />
      <Route path="/past-papers/class-10" element={<SubjectResourceList resourceType="past-papers" level="class-10" />} />
      <Route path="/past-papers/fsc-part-1" element={<SubjectResourceList resourceType="past-papers" level="fsc-part-1" />} />
      <Route path="/past-papers/fsc-part-2" element={<SubjectResourceList resourceType="past-papers" level="fsc-part-2" />} />
      <Route path="/past-papers/class-9/:subject" element={<SubjectResourceList resourceType="past-papers" level="class-9" />} />
      <Route path="/past-papers/class-10/:subject" element={<SubjectResourceList resourceType="past-papers" level="class-10" />} />
      <Route path="/past-papers/fsc-part-1/:subject" element={<SubjectResourceList resourceType="past-papers" level="fsc-part-1" />} /> 
      <Route path="/past-papers/fsc-part-2/:subject" element={<SubjectResourceList resourceType="past-papers" level="fsc-part-2" />} />

      {/* Resource Detail Route */}
      <Route path="/resource/:id" element={<ResourceDetail />} />

      {/* TEMP: LoadingScreen Demo Route */}
      <Route path="/loading-demo" element={<LoadingScreen />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

