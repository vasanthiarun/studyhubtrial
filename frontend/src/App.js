import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from './components/header/header.component.jsx';
import RegisterForm from './components/auth/register.component.jsx';
import LoginForm from './components/auth/login.component.jsx';
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";


const Home = () => {
	return (
		<div>Home dummy content </div>
	);
}


const App = () => {
   return (
    <Routes>
      <Route path="/" element = {<Header />}>
          <Route index element = {<Home />} />
          <Route path="register" element = {<RegisterForm />} />
          <Route path="login" element = {<LoginForm />} />
      </Route> 
	   <Route path="/admin" element={<AdminLayout />}>
		  <Route index element={<Dashboard />} />
		  <Route path="dashboard" element={<Dashboard />} />
		</Route>
     </Routes>
   );
};


export default App;


