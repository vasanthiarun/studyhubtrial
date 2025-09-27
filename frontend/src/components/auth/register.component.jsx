import {React} from 'react';
const RegisterForm = () => {
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
            value=""
          />          
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value=""
          />
        </div>


        <div className="mb-3">
          <label htmlFor="display_name" className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            name="displayName"
            value=""
          />         
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value=""
          />          
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            name="confirm_password"
            value=""
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      {/* Login Link */}
      <p className="mt-3 text-center">
        Already registered?{' '}
        <a href="/login" className="text-decoration-none">
          Login now
        </a>
      </p>
    </div>
);
}
export default RegisterForm;