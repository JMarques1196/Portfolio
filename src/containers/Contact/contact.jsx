import "./contact.css";
import { useState } from "react";
import { client } from "../../client";
import externalLink from "../../assets/icons/external-link.svg";

const Contacts = () => {
  const [contactToggle, setContactToggle] = useState([false, false]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username = "", email = "", message = "" } = formData;

  const contactHandleToggle = (position) => {
    const updatedToggledState = contactToggle.map((item, index) =>
      index === position ? !item : item
    );
    setContactToggle(updatedToggledState);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="contacts">
      <div className="contacts-container">
        <h1 className="contacts">_contact-me</h1>
        {
          // Since we are not using map like in projects and about, we must place the subtitle items bellow our title divs
        }
        <div className="contact-selection-container">
          <div
            className={
              contactToggle[0] === true
                ? "contact-selection contact-open"
                : "contact-selection"
            }
            onClick={() => {
              contactHandleToggle(0);
            }}
          >
            <i
              className={
                contactToggle[0] === true
                  ? "ri-arrow-right-s-fill contact-icon rotate"
                  : "ri-arrow-right-s-fill contact-icon"
              }
            ></i>
            <h2 className="contact-title">contacts</h2>
          </div>
          {contactToggle[0] === true ? (
            <div className="contact-items-container">
              <img className="contact-icon" src={externalLink} alt="link" />
              <h2 className="contact-item">placeholder</h2>
            </div>
          ) : null}

          <div
            className={
              contactToggle[1] === true
                ? "contact-selection contact-open"
                : "contact-selection"
            }
            onClick={() => {
              contactHandleToggle(1);
            }}
          >
            <i
              className={
                contactToggle[1] === true
                  ? "ri-arrow-right-s-fill contact-icon rotate"
                  : "ri-arrow-right-s-fill contact-icon"
              }
            ></i>
            <h2 className="contact-title">find-me-also-in</h2>
          </div>
          {contactToggle[1] === true ? (
            <div className="contact-items-container">
              <img className="contact-icon" src={externalLink} alt="link" />
              <h2 className="contact-item">placeholder</h2>
            </div>
          ) : null}
        </div>
        {!isFormSubmitted ? (
          <form className="inputs-container">
            <div className="input">
              <p className="input-title">_name:</p>
              <input
                className="input-name"
                type="text"
                placeholder=""
                name="username"
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <div className="input">
              <p className="input-title">_email:</p>
              <input
                className="input-name"
                type="text"
                placeholder=""
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <div className="input">
              <p className="input-title">_message:</p>
              <input
                className="input-message"
                type="text"
                placeholder=""
                name="message"
                value={message}
                onChange={handleChangeInput}
              />
              <button type="button" className="submit" onClick={handleSubmit}>
                submit-message
              </button>
            </div>
          </form>
        ) : (
          <div className="new-message">
            <h1 className="new-message-title"> Thank you! </h1>
            <p className="new-message-text">
              {" "}
              Your message was submitted! I'll try to repply as soon as
              possible!
            </p>
            <button
              type="button"
              className="submit"
              onClick={() => setIsFormSubmitted(false)}
            >
              Send new message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
