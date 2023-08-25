import "./contact.css";
import { useState } from "react";
import { client } from "../../client";
import { Footer } from "../../components";
import { ReactComponent as CloseButton } from "../../assets/icons/close-button.svg";
import { ReactComponent as ExternalLink } from "../../assets/icons/external-link.svg";
import { motion } from "framer-motion";
const Contacts = () => {
  const lineNumbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];

  const date = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthName = month[date.getMonth()];
  let dayName = dayNames[date.getDay()];
  let day = date.getDate();

  let currentDate = `${dayName} ${day} ${monthName}`;

  const [contactToggle, setContactToggle] = useState([false, false]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      id="contacts"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Footer />
      <div className="contacts-container">
        <h1 className="contacts">_contact-me</h1>
        {
          // Since we are not using map like in projects and about, we must place the subtitle items bellow our title divs
        }
        <div className="contact-selection-container">
          <div
            className={
              contactToggle[0] === true
                ? "contact-selection contact-open selected"
                : "contact-selection"
            }
            onClick={() => {
              contactHandleToggle(0);
            }}
          >
            <i
              className={
                contactToggle[0] === true
                  ? "ri-arrow-right-s-fill contact-icon-arrow rotate"
                  : "ri-arrow-right-s-fill contact-icon-arrow"
              }
            ></i>
            <h2 className="contact-title">contacts</h2>
          </div>
          {contactToggle[0] && (
            <div className="contact-items-container">
              <ExternalLink className="contact-icon" />
              <h2 className="contact-item">placeholder</h2>
            </div>
          )}

          <div
            className={
              contactToggle[1] === true
                ? "contact-selection contact-open selected"
                : "contact-selection"
            }
            onClick={() => {
              contactHandleToggle(1);
            }}
          >
            <i
              className={
                contactToggle[1] === true
                  ? "ri-arrow-right-s-fill contact-icon-arrow rotate"
                  : "ri-arrow-right-s-fill contact-icon-arrow"
              }
            ></i>
            <h2 className="contact-title">find-me-also-in</h2>
          </div>
          {contactToggle[1] && (
            <div className="contact-items-container">
              <ExternalLink className="contact-icon" />
              <h2 className="contact-item">placeholder</h2>
            </div>
          )}
        </div>
        <div className="form-container">
          <div className="input-title-wrapper">
            <p className="input-container-title">contacts</p>
            <div className="contacts-title-close">
              <CloseButton />
            </div>
          </div>
          <div className="form-content">
            <div className="border-div">
              {!isFormSubmitted ? (
                <form className="form">
                  <div className="input">
                    <p className="input-title">_name:</p>
                    <textarea
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
                    <textarea
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
                    <textarea
                      className="input-message"
                      type="text"
                      placeholder=""
                      name="message"
                      value={message}
                      onChange={handleChangeInput}
                    />
                    <button
                      type="button"
                      className="submit"
                      onClick={handleSubmit}
                    >
                      submit-message
                    </button>
                  </div>
                </form>
              ) : (
                <div className="new-message">
                  <h1 className="new-message-title"> Thank you! </h1>
                  <p className="new-message-text">
                    Your message was submitted! I'll try to repply as soon as
                    possible!
                  </p>
                  <button
                    type="button"
                    className="submit"
                    onClick={() => {
                      setIsFormSubmitted(false);
                      setFormData("", "", "");
                    }}
                  >
                    Send new message
                  </button>
                </div>
              )}
            </div>
            <div className="form-animation">
              <div>
                {lineNumbers.map((lineNumber, number) => (
                  <p className="lineNumbers">{lineNumber}</p>
                ))}
              </div>
              <div className="animation-code-container">
                <p className="line-code">
                  <span className="pink">const</span> button{" "}
                  <span className="pink">=</span> document.querySelector
                  <span className="gray">(</span>
                  <span className="orange">'#sendBtn'</span>
                  <span className="gray">);</span>
                </p>
                <div className="spacer" />
                <p className="line-code">
                  <span className="pink">const</span> message
                  <span className="pink"> =</span>
                  <span className="gray"> {"{"}</span>
                </p>
                <p className="line-code">
                  name:
                  <span className="orange">
                    {formData.username === "" ? (
                      <> ""</>
                    ) : (
                      <> "{formData.username}" </>
                    )}
                  </span>
                  <span className="gray">,</span>
                </p>
                <p className="line-code">
                  email:
                  <span className="orange">
                    {formData.email === "" ? (
                      <> ""</>
                    ) : (
                      <> "{formData.email}" </>
                    )}
                  </span>
                  <span className="gray">,</span>
                </p>
                <p className="line-code">
                  message:
                  <span className="orange">
                    {formData.message === "" ? (
                      <> ""</>
                    ) : (
                      <> "{formData.message}" </>
                    )}
                  </span>
                  <span className="gray">,</span>
                </p>
                <p>
                  <span className="gray">date:</span>
                  <span className="orange"> "{currentDate}"</span>
                  <span className="gray">,</span>
                </p>
                <div className="spacer" />
                <p className="line-code">
                  button.addEventListener(
                  <span className="orange">'click'</span>
                  <span className="gray">
                    , () <span className="pink"> ={">"} </span> {"{"}
                  </span>
                  <span className="line-code">
                    form.send<span className="gray">(</span>message
                    <span className="gray">);</span>
                  </span>
                  <span className="line-code">
                    <span className="gray">{"}"})</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contacts;
