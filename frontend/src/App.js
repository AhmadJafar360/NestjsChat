import { useState } from 'react';
import Login from './components/Login';
import ChatRoom from './components/Chatroom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <div>
      {isLoggedIn ? <ChatRoom /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
