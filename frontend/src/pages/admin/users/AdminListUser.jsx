import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true; //for cookies
const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async() => {
      axios.get('http://localhost:5000/users')
  .then(response => setUsers(response.data))
  .catch(err => console.error('Error fetching users:', err));
     
  };
   useEffect(() => {       
        fetchData();
    }, []);

  return (
    <div className="container mt-5">
      <div className='row'>
      <div className='col'>
      <h2>Users</h2>
      </div>
      <span className='col float-right'><Link to='/add' >Add User</Link></span>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
          </tr>
        </thead> 
        <tbody>
         {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.roll_no}</td>
                <td>{user.display_name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>   
    </div>
  );
}
export default AdminUserList;