import {useState, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from "../../context/user.context.jsx";
const LoginForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { doLogin } =  useContext(UserContext);
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name] : value,

    });
    //clear the errors when typing
    setErrors((prev) => ({
       ...prev,
       [name] : '', 
    }));
  };

  const validateData = () =>
  {
      let newerrors = {};
      if(!formData.email.trim()) newerrors.email = 'Required';
      if(!formData.password.trim()) newerrors.password = 'Required';
      return newerrors;
  } ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    const validationErrors = validateData();
     if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage('Errors found!!')
      console.log(validationErrors);
      return;
    }

    setSubmitting(true);    
    console.log('Form is submitted');
    try {      
       await doLogin(formData);       
       navigate('/');        
      
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }  
}
return (
<div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form method='post' onSubmit={handleSubmit}>       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />          
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      {/* Login Link */}
     <p className="mt-3 text-center">
	  Dont have an account ?{' '}
	  <Link to="/register" className="text-decoration-none">
	    Register now
	  </Link>
	  {' '}|{' '}
	  <Link to="/forgot-password" className="text-decoration-none">
	    Forgot Password?
	  </Link>
    </p>
    </div>
);
}
export default LoginForm;