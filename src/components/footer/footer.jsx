import "./footer.css";
import Insta from "../../assets/icons/insta.svg?react";
import Linkedin from "../../assets/icons/linkedin.svg?react";
import Stack from "../../assets/icons/stack.svg?react";
import Github from "../../assets/icons/github.svg?react";

const Footer = () => {
  return (
    <div id="footer">
      <div className="icons-wrapper">
        <div className="wrapper">
          <p className="title">find me in:</p>
        </div>
        <div className="icon-container">
          <a
            href="https://www.instagram.com/jmarques411/"
            target="_blank"
            rel="noreferrer"
            aria-label="instagram"
          >
            <Insta className="icon" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://www.linkedin.com/in/andre-marques11/"
            target="_blank"
            rel="noreferrer"
            aria-label="linkedin"
          >
            <Linkedin className="icon" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://stackoverflow.com/users/15747054/jmarques1196"
            target="_blank"
            rel="noreferrer"
            aria-label="stackoverflow"
          >
            <Stack className="icon" />
          </a>
        </div>
      </div>

      <div className="icon-github-container">
        <a
          href="https://github.com/JMarques1196"
          target="_blank"
          rel="noreferrer"
          className="desktop-link"
          aria-label="git"
        >
          <p className="title">@JMarques1196</p>
        </a>
        <a
          href="https://github.com/JMarques1196"
          target="_blank"
          rel="noreferrer"
          aria-label="github"
        >
          <Github className="icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
