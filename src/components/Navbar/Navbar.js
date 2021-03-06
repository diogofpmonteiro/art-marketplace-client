import axios from "axios";
import { useState, useEffect, useContext } from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

import { AuthContext } from "../../context/auth.context";

const API_URL = process.env.REACT_APP_SERVER_URL;

const Header = ({ theme, toggleTheme }) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  // const [username, setUsername] = useState(""); commented out until implemented properly
  const [profilePictureURL, setProfilePictureURL] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/user`, { headers: { Authorization: `Bearer ${authToken}` } });

        const thisUser = response.data;
        // setUsername(thisUser.username);
        setProfilePictureURL(thisUser.profilePictureURL);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <Navbar bg={theme} className='custom-nav' expand={false}>
      <Container fluid>
        <Navbar.Brand href='/'>
          <img className='logo-img' src={`/images/Logo_Art4Everyone_${theme}.png`} alt='logo' />
        </Navbar.Brand>

        {!isLoggedIn && !user && (
          <>
            <div>
              <Button variant={theme === "light" ? "outline-dark" : "outline-light"} onClick={toggleTheme} className='theme-btn'>
                {theme === "light" ? (
                  <img className='theme-btn-img' src={`/images/dark-mode-icon.png`} alt='icon' />
                ) : (
                  <img className='theme-btn-img' src={`/images/light-mode-icon.png`} alt='icon' />
                )}
              </Button>
              <Navbar.Toggle></Navbar.Toggle>
            </div>
            <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel' placement='end'>
              <Offcanvas.Header className={`offcanvas-header-${theme}`} closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel'>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={`offcanvas-body-${theme}`}>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link className={`nav-link-${theme}`} href='/login'>
                    Login
                  </Nav.Link>
                  <Nav.Link className={`nav-link-${theme}`} href='/signup'>
                    Sign-up
                  </Nav.Link>
                  <Nav.Link className={`nav-link-${theme}`} disabled>
                    Connect with wallet (Coming soon..)
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}

        {isLoggedIn && user && (
          <>
            {/* SEARCH BAR */}
            {/* <div> 
              <Form className='d-flex'>
                <FormControl type='search' placeholder='Search' className='me-2' aria-label='Search' />
                <Button variant='outline-dark'>Search</Button>
              </Form>
            </div> */}
            <div>
              <Button variant={theme === "light" ? "outline-dark" : "outline-light"} onClick={toggleTheme} className='theme-btn'>
                {theme === "light" ? (
                  <img className='theme-btn-img' src={`/images/dark-mode-icon.png`} alt='icon' />
                ) : (
                  <img className='theme-btn-img' src={`/images/light-mode-icon.png`} alt='icon' />
                )}
              </Button>
              {/* <span className={`nav-username-${theme}`}>{username}</span> */}
              <Navbar.Toggle>
                <img className='profile-img' src={profilePictureURL} alt='profile' />
              </Navbar.Toggle>
            </div>
            <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel' placement='end'>
              <Offcanvas.Header className={`offcanvas-header-${theme}`} closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel'>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={`offcanvas-body-${theme}`}>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link className={`nav-link-${theme}`} href='/user'>
                    My profile
                  </Nav.Link>
                  {/* ADMIN FEATURE! */}
                  <Nav.Link className={`nav-link-${theme}`} href='/products/new/'>
                    Create a product
                  </Nav.Link>

                  <Nav.Link className={`nav-link-${theme}`} disabled>
                    About us (Coming soon..)
                  </Nav.Link>
                  <Nav.Link className={`nav-link-${theme}`} disabled>
                    FAQ (Coming soon..)
                  </Nav.Link>
                  <Nav.Link className={`nav-link-${theme}`} onClick={logOutUser}>
                    Log Out
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
