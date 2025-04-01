import { useState } from 'react'
import './App.css'
import { Form } from './components/Form'
import { Table } from './components/Table'
import { UserProvider } from './context/UserContext'

function App() {

  const [selectedUser, setSelectedUser] = useState(null)
  const [isVisible, setIsVisible] = useState(null);
  // console.log(selectedUser);

  return (
    <>
      <UserProvider>
        <Form selectedUser={selectedUser} setSelectedUser={setSelectedUser} isVisible={isVisible} setIsVisible={setIsVisible}/>        
        <Table setSelectedUser={setSelectedUser} setIsVisible={setIsVisible} isVisible={isVisible}/>
      </UserProvider>
    </>
  )
}

export default App
