import {useState} from 'react';
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    roll_no: '',
    email: '',
    display_name: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name] : value,

    });
  };
return (
<div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Register</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="roll_no" className="form-label">Roll No</label>
          <input
            type="text"
            className="form-control"
            id="roll_no"
            name="roll_no"
            value={formData.roll_no}
            onChange={handleChange}
          />          
        </div>

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
          <label htmlFor="display_name" className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="display_name"
            name="display_name"
            value={formData.display_name}
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

        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <p className="mt-3 text-center">
        Already registered?{' '}
        <Link to="/login" className="text-decoration-none">
          Login now
        </Link>
      </p>
    </div>
);
}
export default RegisterForm;