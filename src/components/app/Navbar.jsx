import React, {Component, useState} from 'react';
import {Container, Row, Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const NavigationComponent = (props) => {
    const [isOpen, changeIsOpen] = useState(false);
    const toggleNavbar = () => changeIsOpen(!isOpen);
 
    return (
        <>
            <Navbar color="black" expand="md" className="navbar">
            <NavbarBrand href="/" id="brand">The DJs Assistant</NavbarBrand>
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
                                    <Link className="navi-link" to={`/playlist/${props.activePlaylistId}`}>{props.activePlaylistId} Playlist</Link>
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


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class NavigationComponent extends React.Component {
//     constructor() {
//         super()
//             this.state = {
//                 isOpen: false,
//             }
//     }
//     toggleNavbar = () => this.setState.isOpen(!this.state.isOpen);
 
//     render() {
//         return (
//             <>
//                 <Navbar light expand="md" className="navbar">
//                 <NavbarBrand id="brand">The DJs Assistant</NavbarBrand>
//                 <NavbarToggler onClick={this.toggleNavbar} />
//                 <Collapse isOpen={this.state.isOpen} navbar> // {/*{props.activeUsername} */}
//                     <Nav className="mr-auto">
//                         {
//                             this.props.isLoggedIn ? (
//                                 <Container>
//                                     <Row>
//                                     <Col>
//                                     <NavItem className="navbar-item">
//                                         <Link className="navi-link" to="/playlists">{this.props.activeUsername}'s Playlists</Link>
//                                     </NavItem>
//                                     </Col>
//                                     <Col>
//                                     <NavItem className="navbar-item">
//                                         <Link className="navi-link" to={`/playist/${this.props.activePlaylistId}`}>{props.activePlaylistId} Playlist</Link>
//                                     </NavItem>
//                                     </Col>
//                                     <Col>
//                                     <NavItem className="navbar-item">
//                                         <Link className="navi-link" to='/' onClick={this.props.clickLogout}>Logout</Link>
//                                     </NavItem>
//                                     </Col>
//                                     </Row>
//                                 </Container>
//                             ) : ( 
//                                 <Container>
//                                     <Row>
//                                         <Col>
                                    
//                                     <NavItem className="navbar-item">
//                                         <Link className="navi-link" to="/user/login">Login</Link>
//                                     </NavItem>
//                                     </Col>
//                                     <Col>
//                                     <NavItem className="navbar-item">
//                                         <Link className="navi-link" to="/user/register">Register</Link>
//                                     </NavItem>
//                                     </Col>
//                                     </Row>
//                                 </Container>
//                             )}
//                     </Nav>
//                 </Collapse>
//                 </Navbar> 
//             </>
//         )
//     }
// };

// export default NavigationComponent;