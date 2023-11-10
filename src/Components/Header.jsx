import React from 'react'
import { Container } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {

  return (
   <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none', color:'black', fontSize:'30px'}}>
            <i class="fa-sharp fa-solid fa-video fa-beat-fade fa-xl me-3"></i>
            Video Player
            </Link>        
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header