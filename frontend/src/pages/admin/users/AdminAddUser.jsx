import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';


axios.defaults.withCredentials = true; //for cookies
const AdminAddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roll_no: '' ,  
    display_name: '',
    email : '',
    password : '',
    user_access: 'member',
    status: 'active' 
  }) ;

  const  handleChange = (e) =>
  {
    const {name, value} = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name] : value,

    })    
    );   
  } ; 

  const handleReset = (e) => {
      navigate('/admin/user/list');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    try {
      await axios.post('http://localhost:5000/createUser', formData)
       console.log('User created'); 
       
      toast.success('User created successfully!', {
        position: 'top-right',
        autoClose: 1500, // 1.5 seconds
        onClose: () => navigate('/admin/user/list') // Redirect after toast closes
      });
    }
    catch(err) { console.error('Error adding user:', err)};
        
   
  };

  return (
     <div className="container mt-5">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="roll_no" className="form-label">Roll No</label>
          </div>
          <div className='mt-3 col-md-4'>
             <input type='text' name='roll_no' id='roll_no' className="form-control" value={formData.roll_no}  onChange={handleChange}/>
          </div>
        </div>  
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="display_name" className="form-label">Name</label>
          </div>
          <div className='mt-3 col-md-4'>
             <input type='text' name='display_name' id='display_name' className="form-control" value={formData.display_name}  onChange={handleChange}/>
          </div>
        </div>  
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="email" className="form-label">Email</label>
          </div>
          <div className='mt-3 col-md-4'>
             <input type='text' name='email' id='email' className="form-control" value={formData.email}  onChange={handleChange} />
          </div>
        </div>   
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="password" className="form-label">Password</label>
          </div>
          <div className='mt-3 col-md-4'>
             <input type='text' name='password' id='password' className="form-control" value={formData.password}  onChange={handleChange} />
          </div>
        </div>   
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="user_access" className="form-label">Role</label>
          </div>
          <div className='mt-3 col-md-4'>
              <select name="user_access" id="user_access" value={formData.user_access} onChange={handleChange} className="form-select">
                <option value="member">Member</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
          </div>
        </div>   
        <div className="row">
          <div className='mt-3 col-md-4'>
             <label htmlFor="status" className="form-label">Status</label>
          </div>
          <div className='mt-3 col-md-4'>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="form-select">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
          </div>
        </div>   
       
        <div class="mt-5 col-md-5 d-flex align-items-center justify-content-center gap-2">
  <button type="submit" class="btn btn-primary">Add User</button>
  <button type="button" class="btn btn-outline-secondary" onClick={handleReset}>Cancel</button>
</div>
      </form>

     </div> 

  );

}
export default AdminAddUser;