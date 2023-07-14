import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layout/header/Header';
import Courses from './components/courses/Courses';
import Footer from './components/layout/footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/contact/Contact';
import Request from './components/request/Request';
import About from './components/about/About';
import Subscribe from './components/payments/Subscribe';
import NotFound from './components/layout/notfound/NotFound';
import PaymentSuccess from './components/payments/PaymentSuccess';
import PaymentFail from './components/payments/PaymentFail';
import CoursePage from './components/coursedetail/CoursePage';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/profile/UpdateProfile';
import ChangePassword from './components/profile/ChangePassword';
import Dashboard from './components/admin/dashboard/Dashboard';
import CreateCourse from './components/admin/createcourse/CreateCourse';
import AdminCourses from './components/admin/admincourses/AdminCourses';
import Users from './components/admin/users/Users';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/coursedetail" element={<CoursePage />} />
        <Route path="/course/:id" element={<CoursePage />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />

        {/* admin routes */}
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/createcourse' element={<CreateCourse/>} />
        <Route path='/admin/courses' element={<AdminCourses/>} />
        <Route path='/admin/users' element={<Users/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// admin -> admincourse createcourse dashboard user sidebar