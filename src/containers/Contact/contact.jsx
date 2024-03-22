import "./contact.css";
import { useState } from "react";
import { client } from "../../client";
import { Footer } from "../../components";
import CloseButton from "../../assets/icons/close-button.svg?react";
import ExternalLink from "../../assets/icons/external-link.svg?react";
import { motion, AnimatePresence } from "framer-motion";
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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Saturday"];
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

  let currentDate = `"${dayName}" ${day} ${monthName}`;

  const [contactToggle, setContactToggle] = useState([true, true]);
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
          <AnimatePresence initial={false}>
            {contactToggle[0] && (
              <motion.div
                className="contact-items-container"
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: 13,
                    paddingBottom: "15px",
                    fontSize: "16px",
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    paddingBottom: 0,
                    fontSize: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.62, 0.23, 0.98],
                }}
              >
                <div className="find-me-item-container">
                  <ExternalLink className="contact-icon" />
                  <a
                    className="contact-item"
                    href="mailto: 11a11joaomarques@gmail.com"
                  >
                    email
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
          <AnimatePresence initial={false}>
            {contactToggle[1] && (
              <motion.div
                className="contact-items-container"
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: "auto",
                    paddingBottom: "15px",
                    fontSize: "16px",
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    paddingBottom: 0,
                    fontSize: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0, 0.62, 0.23, 0.98],
                }}
              >
                <div className="find-me-container">
                  <div className="find-me-item-container">
                    <ExternalLink className="contact-icon" />
                    <a
                      className="contact-item"
                      href="https://www.linkedin.com/in/andre-marques11/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="linkedin"
                    >
                      linkedin
                    </a>
                  </div>
                  <div className="find-me-item-container">
                    <ExternalLink className="contact-icon" />
                    <a
                      className="contact-item"
                      href="https://www.instagram.com/jmarques411/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="instagram"
                    >
                      instagram
                    </a>
                  </div>
                  <div className="find-me-item-container">
                    <ExternalLink className="contact-icon" />
                    <a
                      className="contact-item"
                      href="https://github.com/JMarques1196"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="github"
                    >
                      github
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                    <label htmlFor="name" className="input-title">
                      _name:
                    </label>
                    <textarea
                      id="name"
                      className="input-name"
                      type="text"
                      placeholder=""
                      name="username"
                      value={username}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="email" className="input-title">
                      _email:
                    </label>
                    <textarea
                      id="email"
                      className="input-name"
                      type="text"
                      placeholder=""
                      name="email"
                      value={email}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="message" className="input-title">
                      _message:
                    </label>
                    <textarea
                      id="message"
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
                  <p className="lineNumbers" key={number}>
                    {lineNumber}
                  </p>
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
