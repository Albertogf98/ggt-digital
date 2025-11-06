import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import About from './pages/About';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-screen overflow-x-hidden">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
