import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Card, ListGroup } from 'react-bootstrap';

export default function RoomList({ onJoin }) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:3000/rooms', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(res.data);
    } catch (err) {
      console.error('Gagal mengambil rooms:', err);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      await axios.post(
        'http://localhost:3000/rooms',
        { name: newRoomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewRoomName('');
      fetchRooms();
    } catch (err) {
      console.error('Gagal membuat room:', err);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title>Daftar Room</Card.Title>
              <ListGroup className="mb-3">
                {rooms.map((room) => (
                  <ListGroup.Item key={room._id} action onClick={() => onJoin(room._id)}>
                    {room.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Nama Room Baru</Form.Label>
                  <Form.Control
                    type="text"
                    value={newRoomName}
                    placeholder="Masukkan nama room"
                    onChange={(e) => setNewRoomName(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={createRoom}>
                  Buat Room
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
