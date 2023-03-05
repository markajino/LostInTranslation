import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
//images, auth, routes, images
import { logOut } from "../../auth";
import { APP_ROUTES } from "../../routes";
import { AuthContext } from "../../context/app";
import userImage from "../../assets/images/userImage.png";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, currentUser } = authContext;
  const { username } = currentUser || {};

  const navigate = useNavigate();

  const logoutHandler = () => {
    logOut();
    navigate(APP_ROUTES.root);
  };

  const [name, setName] = useState("");

  useEffect(() => {
    isLoggedIn && username && setName(username);
  }, [username, isLoggedIn]);

  const profileHandler = () => navigate(APP_ROUTES.profile);

  return (
    <div className="translationHeader">
      <div className="headerContent">
        <div className="headerLeft">
          <h2 className="appName">Lost in Translation</h2>
        </div>
        <div className="headerRight">
          <div className="userNameImage">
            <h6>{name}</h6>
            <div
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={profileHandler}
            >
              <img src={userImage} alt="" className="userImage" />
            </div>
            <button className="logoutBtn" onClick={logoutHandler}>
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
