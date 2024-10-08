import "./projects.css";
import { useState, useEffect } from "react";
import { client, urlFor } from "../../client";
import { Footer } from "../../components";
import {
  javascript,
  javascriptBlack,
  react,
  asterisk,
  reactBlack,
  githubWhite,
  tailwind,
  tailwindBlack,
  mern,
  mernBlack,
  freelance,
  freelanceBlack,
} from "../../assets/icons";
import CloseButton from "../../assets/icons/close-button.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/spinner/spinner";

const Projects = () => {
  const filterItems = ["All", "Javascript", "React JS", "Freelance", "SQL"];
  const itemsIcons = [asterisk, javascript, react, freelance, mern];

  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [activeFilters, setActiveFilters] = useState(["All"]);

  const arr = new Array(filterItems.length);
  arr[0] = true;
  const [checked, setChecked] = useState(arr.fill(false, 1));

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const filterArray = (checkedStatus) => {
    const auxArray = [];
    for (let i = 0; i < checkedStatus.length; i++) {
      if (checkedStatus[i] === true) {
        auxArray.push(filterItems[i]);
      }
    }
    return auxArray;
  };
  const filterWorkArray = (arrayUpdate) => {
    let filteredWorkArray = [];

    for (let i = 0; i < arrayUpdate.length; i++) {
      for (let x = 0; x < works.length; x++) {
        if (
          works[x].tags.toString().includes(arrayUpdate[i]) &&
          filteredWorkArray.includes(works[x]) === false
        ) {
          filteredWorkArray.push(works[x]);
        }
      }
    }
    return filteredWorkArray;
  };
  const handleOnChange = (position, tag) => {
    if (position !== 0) {
      const updatedCheckedState = checked.map((item, index) =>
        index === 0 ? (checked[0] = false) : index === position ? !item : item
      );
      setChecked(updatedCheckedState);
      const arrayUpdate = filterArray(updatedCheckedState);
      setFilterWork(filterWorkArray(arrayUpdate));
      setActiveFilters(arrayUpdate);
    } else {
      const updatedCheckedState = [!checked[0], false, false, false, false];
      setChecked(updatedCheckedState);

      if (checked[0] === false) {
        setFilterWork(works);
        setActiveFilters(["All"]);
      } else {
        setFilterWork([]);
        setActiveFilters([]);
      }
    }
  };

  return (
    <motion.div
      id="works"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="works-container">
        <div className="works-selection-container">
          <h1 className="works-title">_portfolio</h1>
          <div className="works-filter-container">
            <div
              className={
                toggle === true
                  ? "works-subtitle-container works-subtitle-open selected"
                  : "works-subtitle-container"
              }
              onClick={() => setToggle(!toggle)}
            >
              <i
                className={
                  toggle === true
                    ? "ri-arrow-right-s-fill works-subtitle-icon rotate "
                    : "ri-arrow-right-s-fill works-subtitle-icon"
                }
              ></i>
              <h2 className="works-subtitle">projects</h2>
            </div>

            <div className={toggle && "works-filter"}>
              {filterItems.map((item, index) => (
                <AnimatePresence initial={false} key={index}>
                  {toggle && (
                    //animations, same for all dropdowns
                    <motion.section
                      className="works-filter-item"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: {
                          opacity: 1,
                          height: 15,
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
                        duration: 0.4,
                        ease: [0, 0.62, 0.23, 0.98],
                      }}
                    >
                      <input
                        id={item}
                        className="works-checkbox"
                        value={item}
                        type="checkbox"
                        checked={checked[index]}
                        onChange={() => handleOnChange(index, item)}
                      />
                      <img
                        className="works-checkbox-icon"
                        src={itemsIcons[index]}
                        alt="icon"
                      />
                      <label htmlFor={item}>{item}</label>
                    </motion.section>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </div>

        <div className="works-selected-container">
          {activeFilters.length !== 0 && (
            <div className="works-active-filters-container">
              <h3 className="works-active-filters-title">{"//"} projects </h3>
              {activeFilters?.map((item) => (
                <p className="works-active-filters" key={item}>
                  / {item};{" "}
                </p>
              ))}
              <CloseButton
                className="projects-title-close"
                alt="close"
                onClick={() => {
                  setActiveFilters([]);
                  setFilterWork([]);
                  setChecked([false, false, false, false, false]);
                }}
              />
            </div>
          )}
          {works.length === 0 && <LoadingSpinner />}
          {works.length !== 0 && (
            <div className="work-card">
              {filterWork?.map((item, itemNum) => (
                // card
                <div className="card-container" key={itemNum}>
                  <div className="card-title-container">
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-tag">/ {item.tags}</p>
                  </div>
                  <div className="card-media-container">
                    <div className="card-img-container">
                      <img
                        className="card-img"
                        src={urlFor(item.imgUrl)}
                        alt="card media"
                      />
                      {item.tags[0] === "React JS" ? (
                        <img
                          className="card-icon light-blue"
                          src={reactBlack}
                          alt="react"
                        />
                      ) : item.tags[0] === "Javascript" ? (
                        <img
                          className="card-icon yellow"
                          src={javascriptBlack}
                          alt="javascript"
                        />
                      ) : item.tags[0] === "Freelance" ? (
                        <img
                          className="card-icon dark-blue"
                          src={freelanceBlack}
                          alt="css"
                        />
                      ) : item.tags[0] === "MERN" ? (
                        <img
                          className="card-icon white"
                          src={mernBlack}
                          alt="stripe"
                        />
                      ) : null}
                    </div>
                    <div className="card-description">
                      <p className="card-text">{item.description}</p>
                      <div className="links-wrapper">
                        {item.projectLink ? (
                          <div className="card-link-container">
                            <a
                              className="card-link"
                              href={item.projectLink}
                              aria-label={item.title}
                              target="_blank"
                              rel="noreferrer"
                            >
                              view-project
                            </a>
                          </div>
                        ) : null}

                        {item.codeLink ? (
                          <div className="card-git">
                            <a
                              href={item.codeLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img src={githubWhite} alt="git" />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
