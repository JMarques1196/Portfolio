import "./about.css";
import { client, urlFor } from "../../client";
import { useState, useEffect } from "react";
import { arrowRight, terminal, gamepad, settings } from "../../assets/icons";
import CloseButton from "../../assets/icons/close-button.svg?react";
import ChatIcon from "../../assets/icons/chat-icon.svg?react";
import React from "react";
import LoadingSpinner from "../../components/spinner/spinner";

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
    "17",
  ];

  const [about, setAbout] = useState([]);
  const [titleToggle, setTitleToggle] = useState([]);
  const [subtitleToggle, setSubtitleToggle] = useState([true, false, false]);
  const [textToggled, setTextToggled] = useState({
    status: false,
    key: "",
  });
  const [detailsToggle, setDetailsToggle] = useState([false, false]);

  useEffect(() => {
    const query = '*[_type == "about"]';
    client.fetch(query).then((data) => {
      setAbout(data);
    });

    const arr = new Array(about.length);
    arr[0] = true;
    setTitleToggle(arr.fill(false, 1, arr.length));
    setTextToggled({
      status: true,
      key: "2e61d7628cfa",
    });
  }, [about.length]);

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
    <div
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="about-me">_about-me</h1>
      <div className="about-container">
        <div className="about-icon-bar">
          <img className="about-icon" src={terminal} alt="terminal" />
          <img className="about-icon" src={gamepad} alt="gamepad" />
          <img className="about-icon" src={settings} alt="settings" />
        </div>
        {about.length === 0 && <LoadingSpinner />}
        <div className="about-dropdown-container">
          {about.map((about, index) => (
            <>
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

              {about.aboutDropdown?.map((dropdown, subtitleIndex) => (
                <>
                  <div
                    className={
                      titleToggle[index]
                        ? "about-subtitle-container about-toggled"
                        : "about-subtitle-container"
                    }
                    onClick={() => handleSubtitleToggle(dropdown.position)}
                  >
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
                  </div>

                  {dropdown.aboutItem?.map((aboutItem, itemIndex) => (
                    <>
                      <div
                        className={
                          subtitleToggle[dropdown.position]
                            ? "about-subtitle-container about-item-toggle"
                            : "about-subtitle-container"
                        }
                        onClick={() => {
                          handleTextToggle(aboutItem._key);
                          setDetailsToggle([false, false]);
                        }}
                      >
                        <img
                          className="about-item-icon"
                          src={urlFor(aboutItem.icon)}
                          alt="item-icon"
                        />
                        <h3 className="about-item">{aboutItem.item}</h3>
                      </div>
                    </>
                  ))}
                </>
              ))}
            </>
          ))}
        </div>
        {about?.map((about, index) => (
          <>
            {about.aboutDropdown?.map((dropdown, subtitleIndex) => (
              <>
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
                                      <h1 className="about-image-title">
                                        {aboutItem.imageOneTitle}
                                      </h1>
                                      {aboutItem.descriptionOne ? (
                                        <>
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
                                    <div
                                      className={
                                        detailsToggle[0]
                                          ? "details-text-container details-open"
                                          : "details-text-container"
                                      }
                                    >
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
                                  </>
                                ) : null}
                                {aboutItem.imageTwo ? (
                                  <>
                                    <div className="details-container">
                                      <h1 className="about-image-title">
                                        {aboutItem.imageTwoTitle}
                                      </h1>
                                      {aboutItem.descriptionTwo ? (
                                        <>
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

                                    <div
                                      className={
                                        detailsToggle[1]
                                          ? "details-text-container details-open"
                                          : "details-text-container"
                                      }
                                    >
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
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default About;
