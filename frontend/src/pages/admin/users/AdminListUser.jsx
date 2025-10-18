import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true; //for cookies
const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    roll_no: '',
    status: 'all',
    role: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);//records per page

  const fetchData = async() => {
      axios.get('http://localhost:5000/users')
  .then(response => setAllUsers(response.data))
  .catch(err => console.error('Error fetching users:', err));
     
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/deleteUser/${userId}`);
       toast.success('User deleted successfully!', {
        position: 'top-right',
        autoClose: 1500, // 1.5 seconds       
      });
      //fetch the user list after deletion
      fetchData();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  //search form
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {       
        fetchData();
    }, []);


  useEffect(() => {
    let filtered = allUsers.filter(user => {
      const matchesName = user.display_name?.toLowerCase().includes(filters.name.toLowerCase());
      const matchesEmail = user.email?.toLowerCase().includes(filters.email.toLowerCase());
      const matchesRoll = user.roll_no?.toLowerCase().includes(filters.roll_no.toLowerCase());
      const matchesStatus = filters.status === 'all' || (filters.status === 'active' ? (user.status == 'active') : !(user.status == 'active'));
      const matchesRole = !filters.role || user.user_access === filters.role;
      return matchesName && matchesEmail && matchesRoll && matchesStatus && matchesRole;
    });

    setUsers(filtered);
  }, [filters, allUsers]);  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">      
       <div className='row mb-3'>
        <div className='col'>
          <h2>Users</h2>
        </div>
        <div className='col text-end'>
          <button className='btn btn-sm btn-outline-primary' onClick={toggleSearch}>
            {showSearch ? 'Hide Filters' : 'Show Filters'}
          </button>
          &nbsp;
          <Link className="btn btn-sm btn-primary" to="/admin/user/add">Add User</Link>
        </div>
      </div>

      {showSearch && (
        <div className='card p-3 mb-4'>
          <div className='row g-2'>
            <div className='col-md-2'>
              <input type="text" name="name" value={filters.name} onChange={handleFilterChange} className="form-control" placeholder="Name" />
            </div>
            <div className='col-md-2'>
              <input type="text" name="email" value={filters.email} onChange={handleFilterChange} className="form-control" placeholder="Email" />
            </div>
            <div className='col-md-2'>
              <input type="text" name="roll_no" value={filters.roll_no} onChange={handleFilterChange} className="form-control" placeholder="Roll No" />
            </div>
            <div className='col-md-2'>
              <select name="status" value={filters.status} onChange={handleFilterChange} className="form-select">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className='col-md-2'>
              <select name="role" value={filters.role} onChange={handleFilterChange} className="form-select">
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((user) => (
              <tr key={user._id}>
                <td>{user.roll_no}</td>
                <td>{user.display_name}</td>
                <td>{user.email}</td>
                <td>{user.user_access}</td>
                <td>
                  {(user.status == 'active') ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/edit/${user._id}`}>Edit</Link> |&nbsp;
                  <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(user._id)}>
                    Delete
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className='row align-items-center'>
        <div className='col-md-6'>
          <label className='form-label'>Records per page: </label>
          <select className='form-select d-inline w-auto ms-2'
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset page when changing size
            }}>
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className='col-md-6 text-end'>
          <nav>
            <ul className='pagination justify-content-end mb-0'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => handlePageChange(num)}>{num}</button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default AdminUserList;