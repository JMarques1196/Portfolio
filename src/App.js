import { Nav } from "./components";
import { Header, About, Contacts, Projects } from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
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
