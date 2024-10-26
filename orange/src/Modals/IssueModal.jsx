// @ts-nocheck
import React, { useState } from "react";
import "./IssueModal.css";
import {
  faCalendar,
  faCheck,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addIssue } from "API/postAPI";
import { updateIssue } from "API/putAPI";

const Modal = ({ showModal, closeModal, id, updateIssueText }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedStage, setSelectedStage] = useState("1"); // Default stage value
  const [description, setDescription] = useState("");
  console.log(id);
  const accessToken = localStorage.getItem("access");

  const handleStageSelection = (stage) => {
    setSelectedStage(stage);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdatedIssue = () => {
    const updateData = {
      title,
      description,
      assigned_to: 1,
      status: "unr",
      stage: parseInt(selectedStage),
      project: 1,
    };
    updateIssue(accessToken, updateData, id);
  };

  const handleAddIssue = () => {
    const issueData = {
      description,
      assigned_to: 15,
      status: false,
      stage: 1,
      project: 1,
    };
    addIssue(accessToken, issueData);
    closeModal();
  };

  return (
    <div className={`modal-issue ${showModal ? "show" : ""}`}>
      <div className="modal-content-issue">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="content-wrapper-issue">
          <h2>Raise an issue</h2>
          <div className="issue-container">
            <div className="issue-box">
              <input
                type="text"
                placeholder="Add Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <h3>select stage</h3>
              <div className="grid-container-issue">
                {[1, 2, 3, 4, 5, 6, 7].map((stage) => (
                  <div
                    key={stage}
                    className={`grid-item-issue ${
                      selectedStage === stage.toString() ? "selected" : ""
                    }`}
                    onClick={() => handleStageSelection(stage.toString())}
                  >
                    <img
                      src={require("../assets/images/Mask_Group_220.png")}
                      alt={`sample image ${stage}`}
                      className="grid-item-issue"
                    />
                    <p>labels for imgs</p>
                  </div>
                ))}
              </div>
              <h3>Enter issue</h3>
              <input
                type="text"
                value={
                  updateIssueText.length !== 0 ? updateIssueText : description
                }
                placeholder="Issue Description...."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="right-portion-issue">
              <div className="assign-div-issue">
                <p>assign to:</p>
                <div className="assign-box-issue">
                  <img src={require("../assets/images/profile-dummy.png")} />
                  <p>Sample name</p>
                </div>
                <div className="assign-box-issue">
                  <img src={require("../assets/images/profile-dummy.png")} />
                  <p>Sample name</p>
                </div>
                <div className="assign-box-issue">
                  <img src={require("../assets/images/profile-dummy.png")} />
                  <p>Sample name</p>
                </div>
                <button>Add more</button>
              </div>
              <div className="attachments-issue">
                <div className="attachment-box-issue">
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
                      icon={faCheck}
                      color="green"
                      style={{ marginLeft: "5px" }}
                    />
                  )}
                </div>
                <div className="attachment-box-issue">
                  <FontAwesomeIcon icon={faCalendar} color="rgb(54, 53, 53)" />
                  <p>Add end date</p>
                </div>
              </div>
            </div>
          </div>
          <div className="raise-issue">
            <button onClick={id ? handleUpdatedIssue : handleAddIssue}>
              Raise an issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
