import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../assets/Header.css';

const Header = ({ name }) => { 

    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const { currentUser2 } = useAuth();
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

                <Navbar.Toggle  onClick={() => setOpen(!open)}/>
                
                <Navbar.Collapse in = {open} className = "justify-content-stretch">
                    <ul className="navbar-nav ml-auto">
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
                            <NavDropdown.Item onClick = {handleClick}> {currentUser ? 'Log out' : 'Sign in'}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLink('account')}>Manage Account</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLink('stats')}>Your stats</NavDropdown.Item>
                            </NavDropdown>    
                        </li>
                    
                    </ul>
                </Navbar.Collapse>

                {/*Creates the "play" button in the navbar for a quick link to the "Games" page*/}
                <div className="text-align: center; border: 1px solid">
                    <Link to = "/Games" className="navbar-brand">Play</Link>
                </div>

                {/*Creates a containor that holds the user-info drop down button*/}
                <div className = "container text-right">

                    {/*Another containor for the drop-down menu*/}
                    <div class="dropdown dropdown-menu-right">

                        {/*The button that is display at top of the menu*/}
                        <button class="btn btn-secondary"
                        id="dropdownMenuButton dropdown-menu-right" data-toggle="dropdown">

                            {/*The name of the player that is displayed at 
                            the top right of their screen*/}
                            {name}

                        </button>
                        
                        {/*The content that is displayed when the dropdown button is clicked*/}
                        <div class="dropdown-menu dropdown-menu dropdown-menu-right" 
                            aria-labelledby="dropdownMenuButton">

                            {/*Creates a link to the user's stats page*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/stats">Stats</Link>
                            </li>
                            
                            {/*Creates a link to the user's accuont page*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/account">Account</Link>
                            </li>

                            {/*For the user to sign out*/}
                            <li className="nav-item">
                                <div className="nav-link" onClick = {handleClick}> {currentUser ? 'Log out' : 'Sign in'} </div>       
                            </li>

                        </div>
                    </div>
                </div>   

            </div>
        </Navbar>
    )
}

export default Header;


