import React, { useRef, useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password entered does not match!!!');
    }
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      });
      if (!response.ok) {
        throw new Error('Failed to create a new account');
      }
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setSignedUp(true);
    navigate('/login');
  };

  useEffect(() => {
    if (signedUp && currentUser) {
      toast.success('Account created successfully!');
    }
  }, [signedUp, currentUser]);

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card className='signup-card'>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email' className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password' className='mb-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type='password'
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-4' type='submit'>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to='/login'>Log in</Link>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Signup;
