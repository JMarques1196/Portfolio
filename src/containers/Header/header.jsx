import "./header.css";
import { Snake, Footer } from "../../components";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div>
      <motion.div
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      <Footer className="footer-visibility" />
    </div>
  );
};

export default Header;
