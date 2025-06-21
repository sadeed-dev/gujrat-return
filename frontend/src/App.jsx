import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ScrollToTop from "./utils/ScrollOnTop"
// import PageWrapper from "./utils/PageWrapper";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner';
// Admin Pages
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard"
import LFAs from "./pages/admin/lfas/LFAs"
import Task from "./pages/admin/task/Task"

import ProtectedRoute from './components/ProtectedRoute';
import TaskUpload from './pages/users-panel/TaskUpload';
import AllUsers from './pages/users/AllUsers';
import { useAuth } from './context/auth/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import LfaApplicationForm from './pages/form/LfaApplicationForm';
import LFAFormDialog from './pages/admin/lfas/LfaViewDialog';
import LfaViewDialog from './pages/admin/lfas/LfaViewDialog';
// // // Lazy-loaded pages

const HomePage = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const LFa = lazy(() => import("./pages/LFa"));
const WorkGetPaid = lazy(() => import("./pages/WorkGetPaid"));
const GramPanchayat = lazy(() => import("./pages/GramPanchayat"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import('./pages/Contact'))
const Faqs = lazy(() => import('./pages/Faqs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

const ChatRoom = lazy(() => import('./pages/admin/lfas/offfer-lfa/ChatRoom'))


function App() {
    const { user } = useAuth();
  
  return (
        <NotificationProvider user={user}>

    <Router>
      <div className="app-container">
        <Suspense fallback={<div>Loading...</div>}>
              <Toaster position="top-center" richColors  />

          <Routes>

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={<AdminDashboard />
              } />

           <Route path="/admin/lfas" element={<LFAs />}>
        <Route path=":id" element={<LfaViewDialog />} />
         </Route>
                  <Route path="/admin/lfas/chatroom/:roomId" element={<ChatRoom />} />

                  <Route path="/admin/lfas/view/:lfaId" element={<ChatRoom />} />

              
            <Route
              path="/admin/task"
              element={ <Task />
              } />

                   <Route path="/admin/users" element={<AllUsers />} />
                  {/* <Route path="/admin/chat-rooms" element={<ChatRoom />} /> */}


            {/* Public Routes with Header/Footer */}

          <Route path="/user/task-uploads" element={<TaskUpload />} />

            <Route
              path="/*"
              element={
                <>
                  <Navbar />
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
                      <Route path="/register" element={<Register />} />

                    </Routes>
                    
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
        </NotificationProvider>

  );
}

export default App;
