import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { NavDropdown, Image } from "react-bootstrap";

function Navigation() {
  const { currentUser, userEmail, userName, userPhotoUrl } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          GOOGLE MAPS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <Nav.Link as={NavLink} to="/Restaurants"></Nav.Link>
                <NavDropdown
                  id="basic-nav-dropdown"
                  title={
                    userPhotoUrl ? (
                      <Image
                        src={userPhotoUrl}
                        height={30}
                        width={30}
                        title={(userName || userEmail) ?? ""}
                        className="img-square"
                        fluid
                        roundedCircle
                      />
                    ) : (
                      userName || userEmail
                    )
                  }
                  align="end"
                >
                  <NavDropdown.Item as={NavLink} to="/UppdateraProfil">
                    UPPDATERA PROFIL
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Admins">
                    ALLA ADMIN
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/SkapaRestaurang">
                    LÄGG TILL RESTAURANG
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Restauranger">
                    RESTAURANGER
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Tips">
                    TIPS
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Loggaut">
                    LOGGA UT
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link style={{color: 'pink'}} as={NavLink} to="/Loggain">
                  {" "}
                  LOGGA IN
                </Nav.Link>
                <Nav.Link style={{color: 'pink'}} as={NavLink} to="/SkapaTips">
                  {" "}
                  SKRIV TIPS
                </Nav.Link>
              </> 
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
