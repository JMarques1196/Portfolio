import "./header.css";
import Placeholder from "../../assets/placeholder.png";
import Snake from "../../components/snake/snake";

const Header = () => {
  return (
    <div id="home">
      <div className="home-container">
        <p className="home-greeting">Hi all. I am</p>
        <h1 className="home-name">André</h1>
        <h1 className="home-name">Marques</h1>
        <p className="home-profession"> {">"} Front-end developer</p>

        <p className="home-github">{"//"} find my profile on Github:</p>
        <p className="home-github-link">
          const <span className="home-github-span-a">githubLink</span>{" "}
          <span className="home-github-span-b">=</span>{" "}
          <a
            className="home-github-a"
            href="https://github.com/JMarques1196"
            target="_blank"
            rel="noreferrer"
          >
            "https://github.com/JMarques1196"
          </a>
        </p>
      </div>
      <div className="home-game">
        <Snake />
      </div>
    </div>
  );
};

export default Header;
