import React, { useContext, useState } from "react";
//components
import Header from "../Header";
import TranslationCard from "./TranslationCard";
//context, apis
import { AuthContext } from "../../context/app";
import { Translation } from "../../api/translations";
//styles
import "./style.css";

const TranslationComponent = () => {
  const authContext = useContext(AuthContext);
  const { currentUser, translations, translationsHandler } = authContext;
  const { id } = currentUser || {};
  const [translate, setTranslate] = useState("");
  const [show, setShow] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setShow(translate);
    try {
      await Translation.createUserTranslations(id, [
        ...translations,
        translate,
      ]);
      translationsHandler([...translations, translate]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginCard">
          <div className="cardContent">
            <Header />

            <div className="translateContentDiv">
              <div className="formDiv">
                <div className="translateFormContent">
                  <form onSubmit={submitHandler}>
                    <i className="fa fa-keyboard-o"></i>
                    <input
                      type="text"
                      name="translateText"
                      required
                      className="nameInput"
                      placeholder="Enter Text"
                      value={translate}
                      onChange={({ target }) => {
                        setTranslate(target.value);
                      }}
                    />
                    <button type="submit" className="submitBtn">
                      <i className="fa fa-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="translatedArea">
              <div className="translatedText">
                <p className="translated">
                  <TranslationCard name={show} />
                </p>
                <div className="translatedBtnDiv">
                  <button type="submit" className="translateButton">
                    Translation
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
