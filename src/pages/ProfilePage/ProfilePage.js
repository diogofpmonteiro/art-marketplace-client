import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import ProductCard from "./../../components/ProductCard/ProductCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const API_URL = process.env.REACT_APP_SERVER_URL;

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [userData, setUserData] = useState(null);

  const { logOutUser } = useContext(AuthContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/user`, { headers: { Authorization: `Bearer ${authToken}` } });

        const thisUser = response.data;
        setUsername(thisUser.username);
        setProfilePictureURL(thisUser.profilePictureURL);
        setUserData(thisUser);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={8}>
          <div className='profile-top'>
            <img src={profilePictureURL} alt='pfp' className='profile-pic' />
            {username}
          </div>
        </Col>
        <Col>
          <div className='profile-right'>
            <Link to={`/user/edit/`}>
              <Button style={{ marginBottom: "10px" }} variant='secondary'>
                Edit Profile
              </Button>
            </Link>
            <br />
            <Button onClick={logOutUser} variant='secondary'>
              Logout
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2 className='favorites-section-profile-title'>Favorite Products</h2>
          <div>{userData && userData.favoriteProducts.map((eachProduct) => <ProductCard eachProduct={eachProduct} />)}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
