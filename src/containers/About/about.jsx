import "./about.css";
import { client, urlFor } from "../../client";
import { useState, useEffect } from "react";
import { arrowRight, terminal, gamepad, settings } from "../../assets/icons";
import { ReactComponent as CloseButton } from "../../assets/icons/close-button.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/chat-icon.svg";
import { Footer } from "../../components";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const About = () => {
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
  // State to fetch data from Sanity
  const [about, setAbout] = useState([]);
  // State to manage each individual menu toggle
  const [titleToggle, setTitleToggle] = useState([]);
  const [subtitleToggle, setSubtitleToggle] = useState([true, false, false]);
  const [textToggled, setTextToggled] = useState({
    status: false,
    key: "",
  });
  const [detailsToggle, setDetailsToggle] = useState([false, false]);
  // useEffect to grab data from sanity
  useEffect(() => {
    const query = '*[_type == "about"]';
    client.fetch(query).then((data) => {
      setAbout(data);
    });

    // setting up a aux array for controling the section title states
    const arr = new Array(about.length);
    arr[0] = true;
    setTitleToggle(arr.fill(false, 1, arr.length));
    setTextToggled({
      status: true,
      key: "2e61d7628cfa",
    });
  }, [about.length]);

  ///////////
  // Custom Hooks to toggle the menus individually
  const titleHandleToggle = (position) => {
    const updatedToggledState = titleToggle.map((item, index) =>
      index === position ? !item : item
    );
    setTitleToggle(updatedToggledState);
  };

  const handleSubtitleToggle = (position) => {
    const updatedSubtitleState = subtitleToggle.map((item, index) =>
      index.toString() === position.toString() ? !item : item
    );

    setSubtitleToggle(updatedSubtitleState);
  };

  const handleTextToggle = (key) => {
    if (textToggled.key === key) {
      setTextToggled({
        status: false,
        key: "",
      });
    } else {
      setTextToggled({
        status: true,
        key,
      });
    }
  };
  // Custom function to toggle dropdown state when clicking the title
  const manageDropdown = (dropdown) => {
    const aux = subtitleToggle;
    for (let i = 0; i < dropdown.length; i++) {
      aux[dropdown[i].position] = false;
    }
    setSubtitleToggle(aux);
  };

  const manageDetails = (detailsState, position) => {
    if (position === "1") {
      setDetailsToggle([!detailsState[0], detailsState[1]]);
    } else if (position === "2") {
      setDetailsToggle([detailsState[0], !detailsState[1]]);
    }
  };

  return (
    <motion.div
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Footer />
      <h1 className="about-me">_about-me</h1>
      <div className="about-container">
        <div className="about-icon-bar">
          <img className="about-icon" src={terminal} alt="terminal" />
          <img className="about-icon" src={gamepad} alt="gamepad" />
          <img className="about-icon" src={settings} alt="settings" />
        </div>

        <div className="about-dropdown-container">
          {about.map((about, index) => (
            <React.Fragment key={index}>
              <div
                className={
                  titleToggle[index] === true
                    ? "about-title-container about-title-open selected"
                    : "about-title-container"
                }
                onClick={() => {
                  titleHandleToggle(index);
                  manageDropdown(about.aboutDropdown);
                }}
              >
                <i
                  className={
                    titleToggle[index] === true
                      ? "ri-arrow-right-s-fill about-title-icon rotate"
                      : "ri-arrow-right-s-fill about-title-icon"
                  }
                ></i>
                <h2 className="about-title">{about.title}</h2>
              </div>
              {
                // Section Title
              }

              {about.aboutDropdown?.map((dropdown, subtitleIndex) => (
                <React.Fragment key={subtitleIndex}>
                  <AnimatePresence initial={false}>
                    {titleToggle[index] && (
                      //animations, same for all dropdowns
                      <motion.section
                        className="about-subtitle-container"
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: {
                            opacity: 1,
                            height: 13,
                            paddingBottom: "0.938rem",
                            fontSize: "1remx",
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
                        onClick={() => handleSubtitleToggle(dropdown.position)}
                      >
                        {
                          //end of animation
                        }
                        <img
                          className={
                            subtitleToggle[dropdown.position] === true
                              ? "about-arrow-icon about-icon-rotate"
                              : "about-arrow-icon"
                          }
                          src={arrowRight}
                          alt="arrow"
                        />
                        <img
                          className="about-folder-icon"
                          src={urlFor(dropdown.icon)}
                          alt="icon"
                        />
                        <h2
                          className={
                            subtitleToggle[dropdown.position] === true
                              ? "about-subtitle selected"
                              : "about-subtitle"
                          }
                        >
                          {dropdown.subtitle}
                        </h2>
                      </motion.section>
                    )}
                  </AnimatePresence>

                  {dropdown.aboutItem?.map((aboutItem, itemIndex) => (
                    <AnimatePresence initial={false} key={itemIndex}>
                      {subtitleToggle[dropdown.position] && (
                        <motion.section
                          className="about-item-container"
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: {
                              opacity: 1,
                              height: 13,
                              paddingBottom: "0.938rem",
                              fontSize: "1rem",
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
                          onClick={() => handleTextToggle(aboutItem._key)}
                        >
                          <img
                            className="about-item-icon"
                            src={urlFor(aboutItem.icon)}
                            alt="item-icon"
                          />
                          <h3 className="about-item">{aboutItem.item}</h3>
                        </motion.section>
                      )}
                    </AnimatePresence>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
        {
          // We use map again so we can place our text beneath the menu items
        }
        {about?.map((about, index) => (
          <React.Fragment key={index}>
            {about.aboutDropdown?.map((dropdown, subtitleIndex) => (
              <React.Fragment key={subtitleIndex}>
                {dropdown.aboutItem?.map(
                  (aboutItem, itemIndex) =>
                    textToggled.key === aboutItem._key && (
                      <div className=" about-text-container" key={itemIndex}>
                        <div className="about-text-title">
                          <div className="title-desktop-container">
                            <h1 className="about-title tab-style">
                              <span className="slash">{"//"}</span>{" "}
                              {aboutItem.item}{" "}
                            </h1>
                            <CloseButton
                              className="title-close"
                              onClick={() => handleTextToggle(aboutItem._key)}
                            />
                          </div>
                          <h2 className="about-subtitle subtitle-desktop">
                            / {dropdown.subtitle}
                          </h2>
                        </div>
                        <div className="about-content-desktop">
                          <div className="about-text-content-wrapper">
                            <div className="lineNumbers-container">
                              {lineNumbers.map((lineNumber, number) => (
                                <p className="aboutLineNumbers" key={number}>
                                  {lineNumber}
                                </p>
                              ))}
                            </div>
                            <div className="about-text-content">
                              <p className="about-text">{aboutItem.text}</p>
                            </div>
                          </div>
                          <div className="about-images">
                            <div className="about-images-container">
                              <h2 className="about-images-title">
                                {aboutItem.title}
                              </h2>
                              <div className="scroll-wrapper">
                                {aboutItem.imageOne ? (
                                  <>
                                    <div className="details-container">
                                      {aboutItem.descriptionOne ? (
                                        <>
                                          <div className="about-profile-pic"></div>
                                          <div
                                            className="details-chat-container"
                                            onClick={() =>
                                              manageDetails(detailsToggle, "1")
                                            }
                                          >
                                            <ChatIcon
                                              className="chat-icon"
                                              alt="chat"
                                            />
                                            <p className="details-chat">
                                              details
                                            </p>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                    <img
                                      className="about-image"
                                      src={urlFor(aboutItem.imageOne)}
                                      alt="im1"
                                    />
                                    {detailsToggle[0] && (
                                      <div className={"details-text-container"}>
                                        <p className="details-text">
                                          {aboutItem.descriptionOne}
                                        </p>
                                        <CloseButton
                                          className="close-button"
                                          onClick={() =>
                                            manageDetails(detailsToggle, "1")
                                          }
                                        />
                                      </div>
                                    )}
                                  </>
                                ) : null}
                                {aboutItem.imageTwo ? (
                                  <>
                                    <div className="details-container">
                                      {aboutItem.descriptionTwo ? (
                                        <>
                                          <div className="about-profile-pic"></div>
                                          <div
                                            className="details-chat-container"
                                            onClick={() =>
                                              manageDetails(detailsToggle, "2")
                                            }
                                          >
                                            <ChatIcon
                                              className="chat-icon"
                                              alt="chat"
                                            />
                                            <p className="details-chat">
                                              details
                                            </p>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                    <img
                                      className="about-image"
                                      src={urlFor(aboutItem.imageTwo)}
                                      alt="im2"
                                    />
                                    {detailsToggle[1] && (
                                      <div className={"details-text-container"}>
                                        <p className="details-text">
                                          {aboutItem.descriptionTwo}
                                        </p>
                                        <CloseButton
                                          className="close-button"
                                          onClick={() =>
                                            manageDetails(detailsToggle, "2")
                                          }
                                        />
                                      </div>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
