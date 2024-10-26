import React, { useState, useEffect, useCallback, useMemo } from "react";
import module from "./quickView.module.css";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getProject as fetchProjectFromAPI } from "API/getAPI";
import style from "../Checkbox/checkbox.module.css";
import { projectID } from "../../Redux/projectHandler";

const Index = React.memo(
  ({
    othersInfo = false,
    buttonTitle = null,
    button = false,
    onClick = null,
    heading = "",
  }) => {
    const [proj, setProj] = useState([]);
    const [displayProject, setDisplayProject] = useState(false);
    const [checkedProjectId, setCheckedProjectId] = useState(null);

    const dispatch = useDispatch();
    const project = useSelector((state) => state.project.project);
    const accessToken =
      useSelector((state) => state.login.access) ||
      localStorage.getItem("access");

    useEffect(() => {
      const fetchProject = async () => {
        const data = await fetchProjectFromAPI(accessToken);
        setProj(data);
        if (data.length > 0) {
          const defaultProjectId = project === 1 ? data[0].id : project;
          setCheckedProjectId(defaultProjectId);
          dispatch(projectID(defaultProjectId));
        }
      };

      if (displayProject && proj.length === 0) {
        fetchProject();
      }
    }, [displayProject, accessToken, proj.length, dispatch, project]);

    useEffect(() => {
      if (checkedProjectId === null && proj.length > 0) {
        const defaultProjectId = project === 1 ? proj[0].id : project;
        setCheckedProjectId(defaultProjectId);
        dispatch(projectID(defaultProjectId));
      }
    }, [checkedProjectId, proj, project, dispatch]);

    const handleProjectToggle = useCallback(() => {
      setDisplayProject((prev) => !prev);
    }, []);

    const setProject = useCallback(
      (id) => {
        setCheckedProjectId(id);
        dispatch(projectID(id));
      },
      [dispatch]
    );

    const projectList = useMemo(
      () =>
        proj.map((project, index) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 25,
              cursor: "pointer",
            }}
            className={style.checkbox}
            key={index}
          >
            <input
              type="checkbox"
              className={style.resolved_checkbox}
              checked={checkedProjectId === project.id}
              onChange={() => setProject(project.id)}
            />
            <h5>{project.title1}</h5>
          </div>
        )),
      [proj, checkedProjectId, setProject]
    );

    return (
      <div className={module.heading_items}>
        <h1>{heading.length !== 0 ? heading : "Project"}</h1>

        <div className={module.top_right_logos_container}>
          {othersInfo && (
            <>
              <div
                className={module.top_right_logos}
                style={{ backgroundColor: "pink" }}
              >
                <img
                  src={require("../../assets/images/WorkerJ152k.png")}
                  alt="Worker checking"
                />
              </div>

              <div
                className={module.top_right_logos}
                style={{ backgroundColor: "blue" }}
              >
                <img
                  src={require("../../assets/images/WorkerH022k.png")}
                  alt="Worker calling"
                />
              </div>

              <div
                className={module.top_right_logos}
                style={{ backgroundColor: "yellow" }}
              >
                <img
                  src={require("../../assets/images/Red_Phone_HandsetG102k.png")}
                  alt="Red phone"
                />
              </div>
            </>
          )}

          <div
            className={module.top_right_logos}
            style={{ backgroundColor: "pink" }}
          >
            <FontAwesomeIcon icon={faBell} color="white" />
          </div>

          <div
            className={module.top_right_logos}
            style={{ backgroundColor: "blue", position: "relative" }}
            onClick={handleProjectToggle}
          >
            <p style={{ color: "white", fontWeight: "800" }}>P</p>

            {displayProject && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "5px",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 5,
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  zIndex: 30,
                  width: "300px",
                }}
              >
                {projectList}
              </div>
            )}
          </div>

          {button && (
            <div className={module.top_icon}>
              <button onClick={onClick}>{buttonTitle}</button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Index;
