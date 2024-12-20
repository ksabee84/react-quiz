import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function GameMenu() {
  const navigate = useNavigate();

  const handleReturnToLandingPage = () => {
    navigate('/');
  }

    return(
        <>
      <Navbar bg="warning" data-bs-theme="light">
        <Container>
          <Navbar.Brand className="text-primary" onClick={handleReturnToLandingPage} style={{cursor: 'pointer'}}>
              A Nagy Kvízjáték v1.0
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
    );
}

export default GameMenu;