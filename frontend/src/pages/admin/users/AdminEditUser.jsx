import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

axios.defaults.withCredentials = true; //for cookies

const AdminEditUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
          roll_no: '' ,  
      display_name: '',
            email : '',
         password : '',
       user_access: 'member',//todo
            status: 'active' //todo
  }) ;
  const { id } = useParams(); // user._id
  const  handleChange = (e) =>
  {
    const {name, value} = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name] : value,

    })    
    );   
  } ; 

  const fetchData = async () => {
    try{
     
    // Example: Fetch user data with the id
     const response = await axios.get(`http://localhost:5000/getUser/${id}`)
     setFormData(response.data);
     console.log(formData);
     console.log(response.data);
   
    }
    catch(error) {       
      console.error('Error fetching data:', error);   
    }        
  } ;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateUser/${id}`, formData)
       console.log('User updated'); 
       
      toast.success('User updated successfully!', {
        position: 'top-right',
        autoClose: 1500, // 1.5 seconds
        onClose: () => navigate('/admin/user/list') // Redirect after toast closes
      });
    }
    catch(err) { console.error('Error updating user:', err)};
        
  };
  useEffect(() => {       
        fetchData();
    }, []);

  return (
     <div className="container mt-5">
      <h2>EDit User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Edit User</button>     
      </form>

     </div> 

  );

}
export default AdminEditUser;