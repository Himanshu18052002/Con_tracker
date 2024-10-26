import React, { useState, useEffect } from "react";
import module from "./issue.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../Components/Checkbox/Index";
import { deleteIssue } from "API/deleteAPI";
import { getIssue } from "API/getAPI";
import QuickView from "../../Components/QuickView/Index";
import IssueModal from "../../Modals/IssueModal";
import { updateIssue } from "API/putAPI";
import { useSelector } from "react-redux";
import { addIssue } from "API/postAPI";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";
import UtilityModal from "Modals/UtilityModal";

function IssuesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [issues, setIssues] = useState([]);
  const [sutilityModal, setSutilityModal] = useState(null);
  const [updateIssueID, setUpdateIssueID] = useState(null);
  const [updatedIssue, setUpdatedIssue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");
  const project = useSelector((state) => state.project.project);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const update = async (data, id) => {
    await updateIssue(accessToken, data, id);
  };

  const handleUpdate = (issue) => {
    setUpdatedIssue(issue.text);
    setUpdateIssueID(issue.id);
    openModal();
  };

  const showUtilityModal = (id) => {
    setSutilityModal((prevId) => (prevId === id ? null : id)); // Toggle utility modal based on the task ID
  };

  const addIssue = () => {
    setUpdatedIssue("");
    setUpdateIssueID(null);
    openModal();
  };

  const handleCheckboxChange = (id) => {
    const result = window.confirm("Do you want to make changes in this issue?");
    if (result) {
      const updatedIssue = issues.map((issue) => {
        if (issue.id === id) {
          const updationData = {
            description: issue.text,
            project: issue.project,
            status: !issue.resolved,
            stage: issue.stage,
            raised_by: issue.raised_by,
            assigned_to: issue.assigned_to,
          };
          update(updationData, id);
          return { ...issue, resolved: !issue.resolved };
        }
        return issue;
      });
      setIssues(updatedIssue);
    }
  };

  const filterIssues = () => {
    switch (selectedCategory) {
      case "resolved":
        return issues.filter((issue) => issue.resolved);
      case "unresolved":
        return issues.filter((issue) => !issue.resolved);
      default:
        return issues;
    }
  };

  const handleHeadingClick = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setSelectedCategory(null);
        break;
      case 1:
        setSelectedCategory("unresolved");
        break;
      case 2:
        setSelectedCategory("resolved");
        break;
      default:
        setSelectedCategory(null);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [project]);

  const fetchIssues = async () => {
    const fetchedIssues = await getIssue(accessToken, project);
    setIssues(fetchedIssues);
    setLoading(false);
    console.log(fetchedIssues);
  };

  const deleteIssueById = async (issueId) => {
    const result = window.confirm("Are you sure to delete this issue?");
    if (result) {
      await deleteIssue(issueId, accessToken);
      setIssues((prevIssues) =>
        prevIssues.filter((issue) => issue.id !== issueId)
      );
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={module.page_container}>
          <div>
            <div className={module.heading_items}>
              <QuickView
                othersInfo={false}
                button={true}
                buttonTitle={"Add Issue"}
                onClick={addIssue}
                heading={"Issues"}
              />
            </div>
            <div className={module.top_heading_container_issues}>
              <h2
                onClick={() => handleHeadingClick(0)}
                className={activeIndex === 0 ? module.active_heading : ""}
              >
                All Issues
              </h2>
              <h2
                onClick={() => handleHeadingClick(1)}
                className={activeIndex === 1 ? module.active_heading : ""}
              >
                Unresolved
              </h2>
              <h2
                onClick={() => handleHeadingClick(2)}
                className={activeIndex === 2 ? module.active_heading : ""}
              >
                Resolved
              </h2>
            </div>
            <div className={module.table_issues}>
              <div className={module.header_issues}>
                <div className={module.header_item_issues}>
                  <h3>Issue</h3>
                </div>
                <div className={module.header_item1_issues}>
                  <h3>Date & Time</h3>
                </div>
                <div className={module.header_item2_issues}>
                  <h3>Assigned to</h3>
                </div>
              </div>
              <div className={module.body_issues}>
                {filterIssues().map((issue) => (
                  <div key={issue.id} className={module.row_issues}>
                    <div className={module.cell_checkbox_issues}>
                      <Checkbox
                        checked={issue.resolved}
                        onChange={() => handleCheckboxChange(issue.id)}
                      />
                    </div>
                    <div className={module.cell_issue_issues}>
                      <p>{issue.text}</p>
                    </div>
                    <div className={module.cell_issues}>
                      <p>{issue.date}</p>
                    </div>
                    <div className={module.cell_issues}>
                      <p>{issue.assigned_to}</p>
                    </div>
                    <div
                      className={module.utility}
                      onClick={() => showUtilityModal(issue.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                    {sutilityModal === issue.id && (
                      <UtilityModal
                        updateFunction={handleUpdate}
                        deleteFunction={deleteIssueById}
                        data={issue}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <IssueModal
            showModal={showModal}
            closeModal={closeModal}
            id={updateIssueID}
            updateIssueText={updatedIssue}
          />
        </div>
      )}
    </>
  );
}

export default IssuesScreen;
