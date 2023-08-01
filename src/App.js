import './App.css';
import { Routes, Route } from 'react-router-dom'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMember';


function App() {
  return (
    <div>
      <Routes>
        <Route element={<ChatRoom />} path='/' />
        <Route element={<Login />} path='/login' />
      </Routes>
      <AddRoomModal/>
      <InviteMemberModal />
    </div>

  );
}

export default App;
