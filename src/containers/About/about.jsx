import "./about.css";
import { client, urlFor } from "../../client";
import { useState, useEffect } from "react";
import arrowRight from "../../assets/icons/arrow-right.svg";
import terminal from "../../assets/icons/terminal.svg";
import gamepad from "../../assets/icons/gamepad.svg";
import settings from "../../assets/icons/settings.svg";

const About = () => {
  // State to fetch data from Sanity
  const [about, setAbout] = useState([]);
  // State to manage each individual menu toggle
  const [titleToggle, setTitleToggle] = useState([]);
  const [subtitleToggle, setSubtitleToggle] = useState([false, false, false]);

  const [textToggled, setTextToggled] = useState({
    status: true,
    key: "",
  });

  // useEffect to grab data from sanity
  useEffect(() => {
    const query = '*[_type == "about"]';
    client.fetch(query).then((data) => {
      setAbout(data);
    });

    // setting up a aux array for controling the section title states
    const arr = new Array(about.length);
    setTitleToggle(arr.fill(false));

    console.log(about);
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

  return (
    <div id="about">
      <h1 className="about-me">_about-me</h1>
      <div className="about-container">
        <div className="about-icon-bar">
          <img className="about-icon" src={terminal} alt="terminal" />
          <img className="about-icon" src={gamepad} alt="gamepad" />
          <img className="about-icon" src={settings} alt="settings" />
        </div>

        <div className="about-dropdown-container">
          {about.map((about, index) => (
            <>
              <div
                className={
                  titleToggle[index] === true
                    ? "about-title-container about-title-open"
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
                <>
                  <div
                    className={
                      titleToggle[index] === true
                        ? "about-subtitle-container visible"
                        : "hidden"
                    }
                    onClick={() => handleSubtitleToggle(dropdown.position)}
                  >
                    <img
                      className={
                        subtitleToggle[dropdown.position] === true
                          ? "about-arrow-icon rotate"
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
                    <div
                      className={
                        subtitleToggle[dropdown.position] === true
                          ? "visible about-item-container"
                          : "hidden"
                      }
                      onClick={() => handleTextToggle(aboutItem._key)}
                    >
                      <img
                        className="about-item-icon"
                        src={urlFor(aboutItem.icon)}
                        alt="item-icon"
                      />
                      <h3 className="about-item">{aboutItem.item}</h3>
                    </div>
                  ))}
                </>
              ))}
            </>
          ))}
        </div>
        {
          // We use map again so we can place our text beneath the menu items
        }
        {about?.map((about, index) => (
          <>
            {about.aboutDropdown?.map((dropdown, subtitleIndex) => (
              <>
                {dropdown.aboutItem?.map((aboutItem, itemIndex) => (
                  <div
                    className={
                      textToggled.key === aboutItem._key
                        ? "visible about-text-container"
                        : "hidden"
                    }
                  >
                    <div className="about-text-title">
                      <h1 className="about-title title-desktop selected">
                        <span className="slash">//</span> {aboutItem.item}{" "}
                      </h1>
                      <h2 className="about-subtitle subtitle-desktop">
                        / {dropdown.subtitle}
                      </h2>
                    </div>
                    <div className="about-content-desktop">
                      <div className="about-text-content">
                        <p className="about-text">{aboutItem.text}</p>
                      </div>
                      <div className="about-images">
                        {aboutItem.imageOne ? (
                          <img
                            className=""
                            src={urlFor(aboutItem.imageOne)}
                            alt="im1"
                          />
                        ) : null}
                        {aboutItem.imageTwo ? (
                          <img
                            className=""
                            src={urlFor(aboutItem.imageTwo)}
                            alt="im2"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default About;
