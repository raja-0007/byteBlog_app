import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from 'react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setUserState] = useState(null);
  const [activeUsers, setActiveUsers] = useState([])
  const [unread, setUnread] = useState({})
  const setCurrentUser = async (userData) => {
    try {
      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem("user"); // for logout
      }
      setUserState(userData);
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    loadUser();
  }, []);
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
