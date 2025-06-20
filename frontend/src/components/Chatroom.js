import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  ListGroup,
} from 'react-bootstrap';

const socket = io('http://localhost:3000');

export default function ChatRoom({ roomId, onLeaveRoom, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const sender = 'jafar'; // Bisa diambil dari token
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on(`room_${roomId}`, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    axios.get(`http://localhost:3000/messages/${roomId}`).then((res) => {
      setMessages(res.data);
    });

    return () => {
      socket.off(`room_${roomId}`);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!content.trim()) return;
    socket.emit('send_message', { roomId, content, sender });
    setContent('');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <strong>Room ID: {roomId}</strong>
              <div>
                <Button variant="secondary" size="sm" onClick={onLeaveRoom}>
                  ⬅ Kembali
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            </Card.Header>
            <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {messages.map((msg) => (
                  <ListGroup.Item key={msg._id}>
                    <strong>{msg.sender}</strong>: {msg.content}
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                  </ListGroup.Item>
                ))}
                <div ref={bottomRef} />
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      value={content}
                      placeholder="Tulis pesan..."
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Kirim</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
