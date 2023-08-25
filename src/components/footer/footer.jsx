import "./footer.css";
import { ReactComponent as Insta } from "../../assets/icons/insta.svg";
import { ReactComponent as Linkedin } from "../../assets/icons/linkedin.svg";
import { ReactComponent as Stack } from "../../assets/icons/stack.svg";
import { ReactComponent as Github } from "../../assets/icons/github.svg";

const Footer = () => {
  return (
    <div id="footer">
      <div className="icons-wrapper">
        <div className="wrapper">
          <h3 className="title">find me in:</h3>
        </div>
        <div className="icon-container">
          <a
            href="https://www.instagram.com/jmarques411/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className="icon" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://www.linkedin.com/in/andre-marques11/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="icon" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://stackoverflow.com/users/15747054/jmarques1196"
            target="_blank"
            rel="noreferrer"
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
        >
          <p className="title">@JMarques1196</p>
        </a>
        <a
          href="https://github.com/JMarques1196"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
