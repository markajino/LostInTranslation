import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
//routes,
import { User } from "../../api/users";
import { APP_ROUTES } from "../../routes";
import { setToken, useLoggedIn } from "../../auth";
import { Translation } from "../../api/translations";
//styles
import "./style.css";

const LoginComponent = () => {
  const isLoggedIn = useLoggedIn();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Translation.getUserTranslations(name);
      const { data } = response;
      if (data?.length > 0) {
        const { id, username } = data[0] || {};
        const obj = JSON.stringify({ id, username });
        setToken(obj);
        navigate(APP_ROUTES.translate);
      } else {
        const response = await User.createUser(name);
        const { data } = response;
        if (data?.username) {
          const { id, username } = data || {};
          const obj = JSON.stringify({ id, username });
          setToken(obj);
          navigate(APP_ROUTES.translate);
        }
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const redirectHandler = useCallback(() => {
    navigate(APP_ROUTES.translate);
  }, [navigate]);

  useEffect(() => {
    isLoggedIn && redirectHandler();
  }, [isLoggedIn, redirectHandler]);

  return (
    <>
      <div className="loginPage">
        <div className="loginCard">
          <div className="cardContent">
            <div className="header">
              <h2 className="appName">Lost in Translation</h2>
            </div>
            <div className="contentDiv">
              <h1 className="headingName">Lost in Translation</h1>
              <h3 className="subHeading">Get Started</h3>
            </div>
            <div className="formCard">
              <div className="formContent">
                <form onSubmit={submitHandler}>
                  <i className="fa fa-keyboard-o"></i>
                  <input
                    type="text"
                    required
                    className="nameInput"
                    name="name"
                    placeholder="What's your name?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={loading}
                  >
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
