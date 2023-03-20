import { createContext, useContext, useState, useEffect } from 'react';
import profilesData from '../data/profile.json';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const users = profilesData.profiles

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (name, email) => {
    // Retrieve the user from the JSON data
   
    const foundUser = users.find((u) => u.email === email && u.name === name);
    if (foundUser) {
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      alert('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    // Remove the user from local storage and from state
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};