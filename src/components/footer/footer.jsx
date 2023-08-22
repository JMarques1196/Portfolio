import "./footer.css";
import { insta, linkedin, stack, github } from "../../assets/icons/";

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
            <img className="icon" src={insta} alt="instagram" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://www.linkedin.com/in/andre-marques11/"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={linkedin} alt="linkedin" />
          </a>
        </div>
        <div className="icon-container">
          <a
            href="https://stackoverflow.com/users/15747054/jmarques1196"
            target="_blank"
            rel="noreferrer"
          >
            <img className="icon" src={stack} alt="stack" />
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
          <img className="icon" src={github} alt="stack" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
