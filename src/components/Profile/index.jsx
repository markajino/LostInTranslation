import React, { useContext } from "react";
import { AuthContext } from "../../context/app";
//components
import Header from "../Header";
//styles
import "./style.css";

const TranslationComponent = () => {
  const authContext = useContext(AuthContext);
  const { translations, translationsHandler } = authContext;

  const delHandler = () => {
    translationsHandler([]);
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginCard">
          <div className="cardContent">
            <Header />

            <div className="translatedArea">
              <div className="translatedText">
                <h3 className="recentlyTranslatedheading">
                  Recently Translations
                </h3>
                <ul>
                  {translations?.slice(-10).map((item, index) => {
                    return <li key={Math.random() + index}>{item}</li>;
                  })}
                </ul>
                <div className="translatedBtnDiv">
                  <button
                    className="deleteButton"
                    disabled={!translations?.length}
                    onClick={delHandler}
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TranslationComponent;
