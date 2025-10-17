import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from './components/header/header.component.jsx';
import RegisterForm from './components/auth/register.component.jsx';
import LoginForm from './components/auth/login.component.jsx';
import Dashboard from "./pages/admin/Dashboard";
import AdminUserList from "./pages/admin/users/AdminListUser.jsx";
import AdminAddUser from "./pages/admin/users/AdminAddUser.jsx";
import AdminEditUser from "./pages/admin/users/AdminEditUser.jsx";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from './routes/AdminRoute'; // Adjust the path as needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
	return (
		<div>Home dummy content </div>
	);
}


const App = () => {
   return (
    <>
    <Routes>
      <Route path="/" element = {<Header />}>
          <Route index element = {<Home />} />
          <Route path="register" element = {<RegisterForm />} />
          <Route path="login" element = {<LoginForm />} />
      </Route> 
	  <Route path="/admin" element={<AdminRoute>  <AdminLayout /> </AdminRoute>}>
		 <Route index element={<Dashboard />} />
		  <Route path="dashboard" element={<Dashboard />} />
		  <Route path="user/list" element={<AdminUserList />} />
		  <Route path="user/add" element={<AdminAddUser />} />
		  <Route path="user/edit/:id" element={<AdminEditUser />} />
      </Route>
     </Routes>
      <ToastContainer />
     </>
   );
};


export default App;


