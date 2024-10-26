import React, { useState, useEffect } from "react";
import module from "./tasks.module.css";
import Checkbox from "Components/Checkbox/Index";
import QuickView from "../../Components/QuickView/Index";
import { getTasks } from "API/getAPI";
import TaskModal from "../../Modals/TaskModal";
import { updateTask } from "API/putAPI";
import { useSelector } from "react-redux";
import { deleteTask } from "API/deleteAPI";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UtilityModal from "Modals/UtilityModal";

function TasksScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [sutilityModal, setSutilityModal] = useState(null); // Change to store task ID
  const [tasks, setTasks] = useState([]);
  const [updateTaskID, setUpdateTaskID] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [loading, setLoading] = useState(true);
  const project = useSelector((state) => state.project.project);
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  useEffect(() => {
    fetchTasks();
  }, [project]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks(accessToken, project);
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
    setLoading(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showUtilityModal = (id) => {
    setSutilityModal((prevId) => (prevId === id ? null : id)); // Toggle utility modal based on the task ID
  };

  const handleUpdate = (task) => {
    setUpdatedTask(task.text);
    setUpdateTaskID(task.id);
    openModal();
  };

  const handleAdd = () => {
    setUpdatedTask("");
    setUpdateTaskID(null);
    openModal();
  };

  const handleDeleteTask = async (id) => {
    const result = window.confirm("Are you sure to delete the task");
    if (result) {
      await deleteTask(id, accessToken);
      setTasks((prevTasks) => prevTasks.filter((tasks) => tasks.id !== id));
    }
  };

  const filterTasks = () => {
    switch (selectedCategory) {
      case "Completed":
        return tasks.filter((task) => task.status === true);
      case "Incomplete":
        return tasks.filter((task) => task.status === false);
      default:
        return tasks;
    }
  };

  const handleHeadingClick = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setSelectedCategory("all");
        break;
      case 1:
        setSelectedCategory("Completed");
        break;
      case 2:
        setSelectedCategory("Incomplete");
        break;
      default:
        setSelectedCategory("all");
    }
  };

  const update = async (data, id) => {
    await updateTask(accessToken, data, id);
  };

  const handleCheckboxChange = (id) => {
    const result = window.confirm("Do you want to make changes to the task");
    if (result) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          const updationdata = {
            status: !task.status,
            task_description: task.text,
            project: task.project,
            created_by: task.raisedBy,
          };
          update(updationdata, id);
          return { ...task, status: !task.status };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={module.container}>
          <div className={module.header}>
            <QuickView
              updates={true}
              project={true}
              othersInfo={false}
              buttonTitle={"Add Task"}
              button={true}
              onClick={handleAdd}
              heading={"Tasks"}
            />
            <div className={module.top_heading_container_tasks}>
              <h2
                onClick={() => handleHeadingClick(0)}
                className={activeIndex === 0 ? module.active_heading : ""}
              >
                All Tasks
              </h2>
              <h2
                onClick={() => handleHeadingClick(1)}
                className={activeIndex === 1 ? module.active_heading : ""}
              >
                Completed
              </h2>
              <h2
                onClick={() => handleHeadingClick(2)}
                className={activeIndex === 2 ? module.active_heading : ""}
              >
                Incomplete
              </h2>
            </div>
          </div>
          <div className={module.body}>
            <div className={module.tasks_table}>
              <div className={module.header_tasks}>
                <div className={module.header_item1_tasks}>
                  <h3>Task</h3>
                </div>
                <div className={module.header_item2_tasks}>
                  <h3>Assigned to</h3>
                </div>
                <div className={module.header_item3_tasks}>
                  <h3>Remarks</h3>
                </div>
              </div>
              <div className={module.body_tasks}>
                {filterTasks().map((task) => (
                  <div key={task.id} className={module.row_tasks}>
                    <div className={module.cell_checkbox_tasks}>
                      <Checkbox
                        checked={task.status}
                        onChange={() => handleCheckboxChange(task.id)}
                        label={"Completed"}
                      />
                    </div>
                    <div className={module.cell_task_tasks}>
                      <p>{task.text}</p>
                    </div>
                    <div className={module.cell_tasks}>
                      <p>{task.date}</p>
                    </div>
                    <div className={module.cell_tasks}>
                      <p>{task.raisedBy}</p>
                    </div>
                    <div
                      className={module.utility}
                      onClick={() => showUtilityModal(task.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                    {sutilityModal === task.id && (
                      <UtilityModal
                        updateFunction={handleUpdate}
                        deleteFunction={handleDeleteTask}
                        data={task}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <TaskModal
              showModal={showModal}
              updateText={updatedTask}
              id={updateTaskID}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TasksScreen;
