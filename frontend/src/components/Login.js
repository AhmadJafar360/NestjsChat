import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const res = await axios.post(`http://localhost:3000/auth/${endpoint}`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      onLogin();
    } catch (err) {
      setError('Username atau password salah atau sudah digunakan.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body>
              <Card.Title>{isRegister ? 'Daftar' : 'Login'}</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  {isRegister ? 'Daftar' : 'Login'}
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError('');
                  }}
                >
                  {isRegister
                    ? 'Sudah punya akun? Login di sini'
                    : 'Belum punya akun? Daftar di sini'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
