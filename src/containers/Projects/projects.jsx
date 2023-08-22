import "./projects.css";
import { useState, useEffect } from "react";
import { client, urlFor } from "../../client";
import { Footer } from "../../components";
import {
  javascript,
  javascriptBlack,
  react,
  css,
  asterisk,
  cms,
  reactBlack,
  cssBlack,
  cmsBlack,
  closeButton,
} from "../../assets/icons";
import { motion } from "framer-motion";

const Projects = () => {
  const filterItems = ["All", "Javascript", "React JS", "CMS", "CSS"];
  const itemsIcons = [asterisk, javascript, react, cms, css];

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
      setFilterWork(data); // we give data object to both states
    });
  }, []);

  // Filter Function
  // checkbox

  const filterArray = (checkedStatus) => {
    const auxArray = [];
    //  evaluate filterItems against updatedCheckedState, if one its true, move the tag to another aux array
    for (let i = 0; i < checkedStatus.length; i++) {
      if (checkedStatus[i] === true) {
        auxArray.push(filterItems[i]);
      }
    }
    return auxArray;
  };
  // LEFT HERE
  // SEEMS TO BE WOOOOORKING MF!!!!!!
  // LEEEEEETS GOOOOOO!!!!!
  const filterWorkArray = (arrayUpdate) => {
    const filteredWorkArray = [];

    for (let i = 0; i < arrayUpdate.length; i++) {
      for (let x = 0; x < works.length; x++) {
        if (works[x].tags.toString() === arrayUpdate[i]) {
          filteredWorkArray.push(works[x]);
        }
      }
    }
    return filteredWorkArray;
  };
  const handleOnChange = (position, tag) => {
    // handle the checkbox

    if (position !== 0) {
      const updatedCheckedState = checked.map((item, index) =>
        index === 0 ? (checked[0] = false) : index === position ? !item : item
      ); // replaced bellow snippet with this, but bug still seems to be present

      //  updatedCheckedState[0]=false  This snippet is needed but seems to be causing a bug where all items display randomly
      setChecked(updatedCheckedState);
      const arrayUpdate = filterArray(updatedCheckedState);
      setFilterWork(filterWorkArray(arrayUpdate));
      setActiveFilters(arrayUpdate);
    } else {
      // HERE SEEMS TO BE WORKING
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
    //Filter Section
    <motion.div
      id="works"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Footer />
      <div className="works-container">
        <div className="works-selection-container">
          <h1 className="works-title">_portfolio</h1>
          <div className="works-filter-container">
            <div
              className={
                toggle === true
                  ? "works-subtitle-container works-subtitle-open"
                  : "works-subtitle-container"
              }
              onClick={() => setToggle(!toggle)}
            >
              <i
                className={
                  toggle === true
                    ? "ri-arrow-right-s-fill works-subtitle-icon rotate"
                    : "ri-arrow-right-s-fill works-subtitle-icon"
                }
              ></i>
              <h1 className="works-subtitle">projects</h1>
            </div>

            <div className={toggle === true ? "works-filter" : "hide-filter"}>
              {
                // We will map each item into the filter function
                filterItems.map((item, index) => (
                  <label key={index} className="works-filter-item">
                    <input
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
                    {item}
                  </label>
                ))
              }
            </div>
          </div>
        </div>
        {
          // active filters display
        }
        <div className="works-selected-container">
          <div className="works-active-filters-container">
            <h3 className="works-active-filters-title">{"//"} projects </h3>
            {activeFilters?.map((item) => (
              // display filters that are currently active
              <p className="works-active-filters">/ {item}; </p>
            ))}
            <img className="title-close" src={closeButton} alt="close" />
          </div>
          {
            // cards
          }
          <div className="work-card">
            {filterWork?.map((item, index) => (
              // card
              <div className="card-container">
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
                    {item.tags.toString() === "React JS" ? (
                      <img
                        className="card-icon light-blue"
                        src={reactBlack}
                        alt="react"
                      />
                    ) : item.tags.toString() === "Javascript" ? (
                      <img
                        className="card-icon yellow"
                        src={javascriptBlack}
                        alt="javascript"
                      />
                    ) : item.tags.toString() === "CSS" ? (
                      <img
                        className="card-icon dark-blue"
                        src={cssBlack}
                        alt="css"
                      />
                    ) : item.tags.toString() === "CMS" ? (
                      <img
                        className="card-icon green"
                        src={cmsBlack}
                        alt="cms"
                      />
                    ) : null}
                  </div>
                  <div className="card-description">
                    <p className="card-text">{item.description}</p>
                    <div className="card-link-container">
                      <a className="card-link" href="#" aria-label={item.title}>
                        view-project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
