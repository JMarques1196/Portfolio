import "./contact.css";
import { useState } from "react";

const Contacts = () => {
  const [contactToggle, setContactToggle] = useState([false, false]);

  const contactHandleToggle = (position) => {
    const updatedToggledState = contactToggle.map((item, index) =>
      index === position ? !item : item
    );
    setContactToggle(updatedToggledState);
  };

  return (
    <>
      <h1 className="contacts">_contact-me</h1>
      {
        // Since we are not using map like in projects and about, we must place the subtitle items bellow our title divs
      }
      <div
        className={
          contactToggle[0] === true
            ? "contact-container contact-open"
            : "contact-container"
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
      <div
        className={
          contactToggle[1] === true
            ? "contact-container contact-open"
            : "contact-container"
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
    </>
  );
};

export default Contacts;
