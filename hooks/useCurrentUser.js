import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setUserState] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [unread, setUnread] = useState({});
  // ✨ 1. Add isLoading state, default to true
  const [isLoading, setIsLoading] = useState(true);

  const setCurrentUser = async (userData) => {
    try {
      setUserState(userData);
      if (userData) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem("user"); // for logout
      }
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          console.log('storeduser', storedUser)
          setUserState(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        // ✨ 2. Set loading to false after the try/catch block is complete
        setIsLoading(false);
      }
    };
    loadUser();
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      activeUsers,
      setActiveUsers,
      unread,
      setUnread,
      // ✨ 3. Expose isLoading in the context's value
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);