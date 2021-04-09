import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ name }) => { 

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
                    Home
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
                            data-toggle="collapse" 
                            data-target="#navbarDropdown">

                            {/*The name of the player that is displayed at 
                            the top right of their screen*/}
                            {name}

                        </button>
                        
                        {/*The content that is displayed when the dropdown button is clicked*/}
                        <div id="navbarDropdown" class="dropdown-menu dropdown-menu-right">

                            {/*Creates a link to the user's stats page*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/stats">Stats</Link>
                            </li>
                            
                            {/*Creates a link to the user's accuont page*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/account">Account</Link>
                            </li>

                            {/*Finds if the user is signed in or not and displays a "Sign-in" or
                                "logout" link depending if the user is signed-in or not*/}
                            <li className="nav-item">
                                <div className="nav-link" onClick = {handleClick}> {currentUser ? 
                                
                                    <Link className="nav-item" to="/login">Login</Link> : 
                                    <Link className="nav-item" to="/signup">Sign-in</Link>} 
                                
                                </div>       
                            </li>

                        </div>
                    </div>
                </div>   

            </div>
        </Navbar>
    )
}

export default Header;


