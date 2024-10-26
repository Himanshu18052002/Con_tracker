import React, { useState } from "react";
import "./Modal.css";
import {
  faCalendar,
  faCheck,
  faFileCircleCheck,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import RootApi from "../API/rootAPI";
import { updateTask } from "API/putAPI";
import { addTasks } from "API/postAPI";

const Modal = ({ showModal, closeModal, updateText = "", id = null }) => {
  console.log(updateText, id);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const [selectedFile, setSelectedFile] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const accessToken = localStorage.getItem("access");

  const handleFileChange = (event) => {
    // Update the selected file when the user chooses a file
    setSelectedFile(event.target.files[0]);
  };
  const handleUpdateTask = async () => {
    const data = {
      task_description: taskTitle,
      status: false,
      project: 1,
    };
    try {
      await updateTask(accessToken, data, id)
        .then(() => {
          alert("Tasks updated Succesfully");
          closeModal();
        })
        .catch((err) => {
          console.error("An error Occured While putting the data", err);
        });
    } catch (err) {
      console.error("An error occured", err);
    }
  };

  const handleAddTask = async () => {
    try {
      const data = {
        project: 1,
        task_description: taskTitle,
        status: false,
      };

      if (!data.task_description) {
        console.error("Task description is required.");
        return;
      }

      await addTasks(accessToken, data).then(() => {
        alert("tasks added succesfully");
        closeModal();
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="content-wrapper">
          <h2>Create Task</h2>
          <div className="task-add-container">
            <div className="task-box">
              <h3>Enter task</h3>
              <input
                type="text"
                placeholder="add title"
                value={updateText ? updateText : taskTitle}
                autoFocus
                onChange={(e) => setTaskTitle(e.target.value)}
              />

              <div className="attachments">
                <div className="attachment-box">
                  <FontAwesomeIcon icon={faPaperclip} color="rgb(54, 53, 53)" />
                  <label htmlFor="fileInput">
                    <p>add attachments</p>
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <FontAwesomeIcon
                      icon={faFileCircleCheck}
                      color="green"
                      size="3x"
                      style={{ marginLeft: "5px" }}
                    />
                  )}
                </div>
                <div className="attachment-box">
                  <FontAwesomeIcon icon={faCalendar} color="rgb(54, 53, 53)" />
                  <p>{currentDate}</p>
                </div>
                <div className="attachment-box">
                  <FontAwesomeIcon icon={faClock} color="rgb(54, 53, 53)" />
                  <p>{currentTime}</p>
                </div>
              </div>
            </div>
            <div className="assign-div">
              <p>Assigned to: </p>
              <div className="assign-box">
                <img src={require("../assets/images/profile-dummy.png")} />
                <p>Sample name</p>
              </div>
              <div className="assign-box">
                <img src={require("../assets/images/profile-dummy.png")} />
                <p>Sample name</p>
              </div>
              <div className="assign-box">
                <img src={require("../assets/images/profile-dummy.png")} />
                <p>Sample name</p>
              </div>
              <div className="assign-box">
                <img src={require("../assets/images/profile-dummy.png")} />
                <p>Sample name</p>
              </div>
              <button>Add more</button>
            </div>
          </div>
          <div className="add-task">
            <button
              onClick={
                updateText.length !== 0 ? handleUpdateTask : handleAddTask
              }
            >
              Add a task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
