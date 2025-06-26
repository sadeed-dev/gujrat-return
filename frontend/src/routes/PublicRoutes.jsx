import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Settings } from 'lucide-react';
import ScrollToTop from '../shared/ScrollToTop'
import NotFound from '../pages/NotFound';
const HomePage = React.lazy(() => import('../pages/HomePage'));
const About = React.lazy(() => import('../pages/About'));
const LFa = React.lazy(() => import('../pages/LFa'));
const WorkGetPaid = React.lazy(() => import('../pages/WorkGetPaid'));
const GramPanchayat = React.lazy(() => import('../pages/GramPanchayat'));
const Services = React.lazy(() => import('../pages/Services'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Faqs = React.lazy(() => import('../pages/Faqs'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));

const PublicRoutes = () => {
  return (
    <>
      <Navbar />
            <ScrollToTop /> 

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/lfa" element={<LFa />} />
          <Route path="/work-get-paid" element={<WorkGetPaid />} />
          <Route path="/gram-panchayat" element={<GramPanchayat />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default PublicRoutes;
