import Header from "./containers/Header/header";
import Navbar from "./components/nav/nav.jsx";
import About from "./containers/About/about";
import Projects from "./containers/Projects/projects.jsx";
import Contacts from "./containers/Contact/contact.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path={"/"} element={<Header />} />
          <Route exact path={"/about"} element={<About />} />
          <Route exact path={"/projects"} element={<Projects />} />
          <Route exact path={"/contacts"} element={<Contacts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
