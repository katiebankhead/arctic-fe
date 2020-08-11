import React from 'react'
import * as bs from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppContext from './context'

function TopContainer() {
    const state = React.useContext(AppContext)

    return (
        <bs.Navbar variant='dark' expand='lg'>
            <Link to='/'>
                <bs.Navbar.Brand>
                <i className="fas fa-dna p-1" style={{ fontSize: '2rem'}}></i>
                    Arctic
                </bs.Navbar.Brand>
            </Link>
            <bs.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <bs.Navbar.Collapse id="basic-navbar-nav" />
            <bs.Nav className = 'mr-auto'>
                <Link to='/cart' className='nav-link'>
                    <i className="fas fa-shopping-cart"></i>
                    <span className = 'p-2'>{state.cartCount}</span>
                </Link>
            </bs.Nav>
            <bs.Nav>
                <bs.NavDropdown title="Welcome, Katie" alignRight>
                    <bs.NavDropdown.Item>My Account</bs.NavDropdown.Item>
                    <bs.NavDropdown.Divider />
                    <bs.NavDropdown.Item>Logout</bs.NavDropdown.Item>
                </bs.NavDropdown>
            </bs.Nav>
        </bs.Navbar>
    );
}

export default TopContainer;