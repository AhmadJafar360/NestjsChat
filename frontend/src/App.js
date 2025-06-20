import { useState } from 'react';
import Login from './components/Login';
import RoomList from './components/roomList';
import ChatRoom from './components/Chatroom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [roomId, setRoomId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRoomId(null);
  };

  const handleLeaveRoom = () => {
    setRoomId(null); // ⬅️ kembali ke daftar room
  };

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  if (!roomId) return <RoomList onJoin={(id) => setRoomId(id)} />;

  return (
    <ChatRoom roomId={roomId} onLeaveRoom={handleLeaveRoom} onLogout={handleLogout} />
  );
}

export default App;
