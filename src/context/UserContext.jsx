import { useState, useEffect } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const newUser = { id: uuidv4(), ...user };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? {...user, ...updatedUser} : user)))
  }

  const deleteUser = (id) => {
    if(confirm('Are you sure to delete data ?')){
    setUsers(users.filter((user) => user.id !== id))
  }}

  return (
    <UserContext.Provider value={{users, setUsers, addUser, deleteUser, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }
