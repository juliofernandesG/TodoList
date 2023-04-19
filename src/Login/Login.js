import React, { useRef, useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let failed = false;
    try {
      setLoading(true);

      const response = await fetch('http://localhost:4000/login');
      const data = await response.json();

      const user = data.find(user => user.email === emailRef.current.value && user.password === passwordRef.current.value);
      if (!user) {
        throw new Error('Email ou senha invalidos');
      }

      // Faça o login do usuário aqui

    } catch (error) {
      failed = true;
      toast.error(error.message);
    }
    setLoading(false);
    if (!failed) {
      navigate('/');
    }
  };

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card className='login-card'>
          <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email' className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-4' type='submit'>
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center'>
          Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Login;
