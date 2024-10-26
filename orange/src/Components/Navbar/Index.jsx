import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faComment,
  faHardDrive,
  faHome,
  faPencilRuler,
  faPieChart,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import module from "./navbar.module.css";
import logo from "../../assets/Logo/Logo.png";

function Index({ visible, toggleNavbar }) {
  console.log(visible);
  console.log(toggleNavbar);
  const [active, setActive] = useState(null);
  return (
    <nav className={`${module.navbar} ${visible ? module.visible : ""}`}>
      <div
        className={`${module.logoContainer} ${
          visible ? module.logoVisible : module.logoHidden
        }`}
      >
        <img className={module.logoImage} src={logo} alt="Logo" />
      </div>
      <div>
        <div className={module.iconsContainer}>
          <div
            className={`${module.icon} ${
              active === "home" ? module.active : ""
            }`}
          >
            {visible ? (
              <Link to={"/home"} onClick={() => setActive("home")}>
                <FontAwesomeIcon size="2xl" color="white" icon={faHome} />
                <p>Home</p>
              </Link>
            ) : (
              <Link to={"/home"} onClick={() => setActive("home")}>
                <FontAwesomeIcon size="xl" color="white" icon={faHome} />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "progress" ? module.active : ""
            }`}
          >
            {visible ? (
              <Link to={"/progress"} onClick={() => setActive("progress")}>
                <FontAwesomeIcon size="xl" color="white" icon={faThumbsUp} />
                <p>Progress Report</p>
              </Link>
            ) : (
              <Link to={"/progress"} onClick={() => setActive("progress")}>
                <FontAwesomeIcon size="xl" color="white" icon={faThumbsUp} />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "attendance" ? module.active : ""
            }`}
          >
            {visible ? (
              <Link to={"/attendance"} onClick={() => setActive("attendance")}>
                <FontAwesomeIcon size="xl" color="white" icon={faPieChart} />
                <p>Attendance</p>
              </Link>
            ) : (
              <Link to={"/attendance"} onClick={() => setActive("attendance")}>
                <FontAwesomeIcon size="xl" color="white" icon={faPieChart} />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "tasks" ? module.active : ""
            }`}
          >
            {visible ? (
              <Link to={"/tasks"} onClick={() => setActive("tasks")}>
                <FontAwesomeIcon
                  size="xl"
                  color="white"
                  icon={faClipboardCheck}
                />
                <p>Tasks</p>
              </Link>
            ) : (
              <Link to={"/tasks"} onClick={() => setActive("tasks")}>
                <FontAwesomeIcon
                  size="xl"
                  color="white"
                  icon={faClipboardCheck}
                />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "issue" ? module.active : ""
            }`}
          >
            {visible ? (
              <Link to={"/issue"} onClick={() => setActive("issue")}>
                <FontAwesomeIcon size="xl" color="white" icon={faComment} />
                <p>Issues</p>
              </Link>
            ) : (
              <Link to={"/issue"} onClick={() => setActive("issue")}>
                <FontAwesomeIcon size="xl" color="white" icon={faComment} />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "inventory" ? module.active : ""
            }`}
            onClick={() => setActive("inventory")}
          >
            {visible ? (
              <Link to={"/inventory"}>
                <FontAwesomeIcon size="xl" color="white" icon={faHardDrive} />
                <p>Inventory</p>
              </Link>
            ) : (
              <Link to={"/inventory"}>
                <FontAwesomeIcon size="xl" color="white" icon={faHardDrive} />
              </Link>
            )}
          </div>
          <div
            className={`${module.icon} ${
              active === "drawing" ? module.active : ""
            }`}
            onClick={() => setActive("drawing")}
          >
            {visible ? (
              <Link to={"/drawing"}>
                <FontAwesomeIcon size="xl" color="white" icon={faPencilRuler} />
                <p>Drawings</p>
              </Link>
            ) : (
              <Link to={"/drawing"}>
                <FontAwesomeIcon size="xl" color="white" icon={faPencilRuler} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={module.profileContainer}>
            <FontAwesomeIcon size="2x" icon={faUser} />
          </div>
          <p>Profile</p>
        </div>
      </div>
    </nav>
  );
}

export default Index;
