import React, {useState} from 'react';
import {Container, Row, Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const NavigationComponent = (props) => {
    const [isOpen, changeIsOpen] = useState(false);
    const toggleNavbar = () => changeIsOpen(!isOpen);
 
    return (
        <>
            <Navbar light expand="md" className="navbar">
            <NavbarBrand id="brand">The DJs Assistant</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={isOpen} navbar> // {/*{props.activeUsername} */}
                <Nav className="mr-auto">
                    {
                        props.isLoggedIn ? (
                            <Container>
                                <Row>
                                <Col>
                                <NavItem className="navbar-item">
                                    <Link className="navi-link" to="/playlists">{props.activeUsername}'s Playlists</Link>
                                </NavItem>
                                </Col>
                                <Col>
                                <NavItem className="navbar-item">
                                    <Link className="navi-link" to={`/playist/${props.activePlaylistId}`}>{props.activePlaylistId} Playlist</Link>
                                </NavItem>
                                </Col>
                                <Col>
                                <NavItem className="navbar-item">
                                    <Link className="navi-link" to='/' onClick={props.clickLogout}>Logout</Link>
                                </NavItem>
                                </Col>
                                </Row>
                            </Container>
                        ) : ( 
                            <Container>
                                <Row>
                                    <Col>
                                
                                <NavItem className="navbar-item">
                                    <Link className="navi-link" to="/user/login">Login</Link>
                                </NavItem>
                                </Col>
                                <Col>
                                <NavItem className="navbar-item">
                                    <Link className="navi-link" to="/user/register">Register</Link>
                                </NavItem>
                                </Col>
                                </Row>
                            </Container>
                        )}
                </Nav>
            </Collapse>
            </Navbar>
        </>
    )
};

export default NavigationComponent;