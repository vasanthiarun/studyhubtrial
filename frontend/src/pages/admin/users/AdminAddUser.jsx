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
      <form>
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
             <input type='text' name='password' id='email' className="form-control" value={formData.password}  onChange={handleChange} />
          </div>
        </div>   
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Add User</button>     
      </form>

     </div> 

  );

}
export default AdminAddUser;