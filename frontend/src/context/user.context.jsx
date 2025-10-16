import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; //for cookies

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); 

   // check login on page load
  useEffect(() => {
    axios.get("http://localhost:5000/auth/getLoggedUser")
      .then(res => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null));
  }, []);

  const doLogin = async (formData) => {    
    try {
      const { email, password } = formData;
      console.log('doLogin called');
      let response = await axios.post("http://localhost:5000/user/login", { email, password });
      console.log(response);
      if(response.status == 200){
        console.log('doLogin called and res ok');
        const res = await axios.get("http://localhost:5000/auth/getLoggedUser");
        console.log('getLoggedUser called ');
        console.log(res);
        console.log(res.data);
        setCurrentUser(res.data);
        console.log(currentUser);
        return res.data; // success
      }  
    }
    catch (err) {
      const message = err.response?.data?.message || "Login failed. Please try again.";     
      throw new Error(message); // allow Login.js to catch it
    }
  };

  const doLogout = async () => {
    await axios.post("http://localhost:5000/user/logout");
    setCurrentUser(null);
  }; 

   const value = { currentUser, setCurrentUser, doLogin, doLogout };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};