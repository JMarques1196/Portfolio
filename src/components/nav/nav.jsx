import "./nav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [toggled, setToggled] = useState(false);

  const items = [
    { name: "_home", url: "" },
    { name: "_about", url: "about" },
    { name: "_projects", url: "projects" },
    { name: "_contacts", url: "contacts" },
  ];

  const renderItems = () =>
    items.map((item, index) => (
      <li key={index} className="nav-item">
        <NavLink to={`${item.url}`} className="nav-link">
          {item.name}
        </NavLink>
      </li>
    ));

  return (
    <nav>
      <div className="nav-links">
        <p className="nav-name">andre-marques</p>
        {
          // add each NavLink individually here
        }
        <ul className="nav-desktop-links">{renderItems()}</ul>
      </div>
      <div className="nav-container">
        <div className="nav-name-mobile">andre-marques</div>
        <div
          className={toggled ? "hamburguer close" : "hamburguer"}
          onClick={() => setToggled(!toggled)}
        >
          <span className="meat"></span>
          <span className="meat"></span>
          <span className="meat"></span>
          <span className="meat"></span>
        </div>
      </div>
      <ul
        className={["menu", toggled && "active"].filter(Boolean).join(" ")}
        onClick={() => setToggled(false)}
      >
        {renderItems()}
      </ul>
      {
        //By using filter(Boolean).join(' '), we can ensure that no undefined or empty classes are added to the DOM.
      }
    </nav>
  );
}
