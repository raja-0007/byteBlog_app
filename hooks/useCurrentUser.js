import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([])
  const [unread, setUnread] = useState({})
  return (
    <UserContext.Provider value={{ 
      currentUser, setCurrentUser,
      activeUsers, setActiveUsers,
      unread, setUnread
       }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext=()=>useContext(UserContext)
