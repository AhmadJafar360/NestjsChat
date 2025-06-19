import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3000');

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const sender = 'jafar'; // bisa ambil dari JWT nanti
  const roomId = '123';

  useEffect(() => {
    socket.on(`room_${roomId}`, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    axios.get(`http://localhost:3000/messages/${roomId}`).then(res => {
      setMessages(res.data);
    });

    return () => {
      socket.off(`room_${roomId}`);
    };
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', { roomId, content, sender });
    setContent('');
  };

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}</b>: {m.content}</div>
        ))}
      </div>
      <input value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
}
