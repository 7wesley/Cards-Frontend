import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {

    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const history  = useHistory();

    const handleClick = async () => {
        if (currentUser)
            await logout();
        //possibly POST logout success
        setDropOpen(false);
        history.push('login');
    }

    const handleLink = (link) => {
        if (open == true)
            setOpen(false);
        history.push(`/${link}`);
    }

    return (
        <Navbar bg = 'dark' variant = 'dark' expand = 'lg'>
            <div className = "container">
                <Link onClick = {() => handleLink('')}className="navbar-brand">
                    <FontAwesomeIcon icon = {faCrown} size = {'lg'}/>
                </Link>
                <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setOpen(!open)}/>
                <Navbar.Collapse in = {open} className = "justify-content-stretch">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item" onClick={() => handleLink('stats')}>
                        <Link className="nav-link">Stats</Link>
                        </li>
                        <li className="nav-item" onClick={() => handleLink('games')}>
                            <Link className="nav-link">Games</Link> 
                        </li>
                        <li className="nav-item" onClick={() => handleLink('contact')}>
                            <Link className="nav-link" >Contact</Link>
                        </li>
                        <li className="nav-item" onClick={() => handleLink('about')}>
                            <Link className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <NavDropdown onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)} onClick = {() => setDropOpen(!dropOpen)} show = {dropOpen} title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleLink('account')}>Manage Account</NavDropdown.Item>
                                <NavDropdown.Item onClick = {handleClick}> {currentUser ? 'Log out' : 'Sign in'}</NavDropdown.Item>
                            </NavDropdown>    
                        </li>
                        <li className="nav-item" onClick = {() => handleLink('layout')}>
                        <Link className="nav-link">Layout</Link>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;


