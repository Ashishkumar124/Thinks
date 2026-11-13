import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorkPage from './pages/WorkPage';
import CaseStudyPage from './pages/CaseStudyPage';
import IndustriesPage from './pages/IndustriesPage';
import IndustryDetailPage from './pages/IndustryDetailPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about-us/" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/services/:slug/" element={<ServiceDetailPage />} />
        <Route path="/our-work" element={<WorkPage />} />
        <Route path="/our-work/" element={<WorkPage />} />
        <Route path="/our-work/:slug" element={<CaseStudyPage />} />
        <Route path="/our-work/:slug/" element={<CaseStudyPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/industries/:slug/" element={<IndustryDetailPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
