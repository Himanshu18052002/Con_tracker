import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import module from "./home.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import QuickView from "../../Components/QuickView/Index";
import Checkbox from "Components/Checkbox/Index";
import {
  getConsumptionRecord,
  getIssue,
  getProject,
  getTasks,
} from "API/getAPI";
import { useSelector } from "react-redux";
import images1 from "../../assets/images/Mask_Group_213_cn.png";
import images2 from "../../assets/images/Mask_Group_214_cm.png";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";

function Index() {
  const [task, setTask] = useState([]);
  const [issue, setIssue] = useState([]);
  const [dailyProgress, setDailyProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    fetchTasks();
    fetchIssue();
    fetchProgress();
  }, [project]);

  const fetchIssue = async () => {
    const data = await getIssue(accessToken, project);
    if (data.length >= 2) {
      setIssue([data[data.length - 1], data[data.length - 2]]);
    } else {
      setIssue(data);
    }
  };

  const fetchProgress = async () => {
    const data = await getConsumptionRecord(accessToken, project);
    if (data.length >= 4) {
      setDailyProgress([
        data[data.length - 1],
        data[data.length - 2],
        data[data.length - 3],
        data[data.length - 4],
      ]);
    } else if (data.length < 4 && data.length >= 1) {
      setDailyProgress(data);
    } else {
      setDailyProgress([]);
    }
    setLoading(false);
  };
  const fetchTasks = async () => {
    const data = await getTasks(accessToken, project);
    if (data.length >= 2) {
      setTask([data[data.length - 1], data[data.length - 2]]);
    } else {
      setTask(data);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={module.project_container}>
          <div className={module.project_heading_container}>
            <QuickView othersInfo={true} buttonTitle={null} button={false} />
            <h2>Daily Progress</h2>
            <div className={module.daily_progress_div}>
              {dailyProgress.length === 0 ? (
                <h1>No daily progress</h1>
              ) : (
                dailyProgress?.map((item) => (
                  <div
                    key={item.id}
                    className={module.daily_progress_container}
                  >
                    <p style={{ fontSize: "20px" }}>{item.stageTitle}</p>
                    <div className={module.daily_progress_text_l2}>
                      <h3>{item.blockTitle}</h3>
                      <h4>{item.levelTitle}</h4>
                      <p>{item.status}</p>
                    </div>
                    <div className={module.daily_progress_container_img}>
                      <img src={images1} alt="image" />
                      <img src={images2} alt="image" />
                      <img src={images1} alt="image" />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={module.main_items_container}>
              <div className={module.frist_column}>
                <div className={module.drawings_div}>
                  <h2>Drawings</h2>
                  <div className={module.drawings_container}>
                    <div className={module.drawings_box}>
                      <div className={module.drawings_frist_section}>
                        <img
                          src={require("../../assets/images/Mask_Group_220.png")}
                        />
                        <p style={{ fontWeight: "700" }}>pdf3.pdf</p>
                      </div>
                      <div className={module.drawings_second_section}>
                        <h4>13th april</h4>
                        <p>new</p>
                      </div>
                      <div className={module.drawings_third_section}>
                        <p>Floor plan</p>
                        <h4>Option 1</h4>
                      </div>
                    </div>
                    <div className={module.drawings_box}>
                      <div className={module.drawings_frist_section}>
                        <img
                          src={require("../../assets/images/Mask_Group_220.png")}
                        />
                        <p style={{ fontWeight: "700" }}>pdf3.pdf</p>
                      </div>
                      <div className={module.drawings_second_section}>
                        <h4>13th april</h4>
                        <p>new</p>
                      </div>
                      <div className={module.drawings_third_section}>
                        <p>Floor plan</p>
                        <h4>Option 1</h4>
                      </div>
                    </div>
                    <div className={module.drawings_box}>
                      <div className={module.drawings_frist_section}>
                        <img
                          src={require("../../assets/images/Mask_Group_222.png")}
                        />
                        <p style={{ fontWeight: "700" }}>pdf3.pdf</p>
                      </div>
                      <div className={module.drawings_second_section}>
                        <h4>13th april</h4>
                        <p>new</p>
                      </div>
                      <div className={module.drawings_third_section}>
                        <p>Floor plan</p>
                        <h4>Option 1</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={module.issues_container}>
                  <div className={module.box}>
                    <h2>Issues</h2>
                    <a onClick={() => navigate("/issue")}>
                      See all issues{" "}
                      <FontAwesomeIcon icon={faArrowRight} color="black" />
                    </a>
                  </div>
                  {issue ? (
                    issue.map((issue, Index) => (
                      <div key={Index} className={module.Issue_box}>
                        <div className={module.issue_first_section}>
                          <img
                            src={require("../../assets/images/Flag_Push_PinJ022k.png")}
                          />
                        </div>
                        <div className={module.issue_second_section}>
                          <p style={{ color: "red" }}>Since 7 days</p>
                          <h2>{issue.text}</h2>
                          <p>{issue.date}</p>
                        </div>
                        <div className={module.issue_third_section}>
                          <button className={module.issue_button}>{`>`}</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={module.Issue_box}>
                      <div className={module.issue_first_section}>
                        <img
                          src={require("../../assets/images/Flag_Push_PinJ022k.png")}
                        />
                      </div>
                      <div className={module.issue_second_section}>
                        <p style={{ color: "red" }}>Loading...</p>
                        <h2>Loading...</h2>
                        <p>Loading...</p>
                      </div>
                      <div className={module.issue_third_section}>
                        <button className={module.issue_button}>{`>`}</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className={module.pendingTasks_container}>
                  <div className={module.box}>
                    <h2>Pending Tasks</h2>
                    <a onClick={() => navigate("/tasks")}>
                      View all{" "}
                      <FontAwesomeIcon icon={faArrowRight} color="black" />
                    </a>
                  </div>
                  {task ? (
                    task.map((task, Index) => (
                      <div key={Index} className={module.pendingTasks_box}>
                        <h3>{task.text}</h3>
                        <p>{task.date}</p>
                        <Checkbox label="Completed" checked={task.status} />
                      </div>
                    ))
                  ) : (
                    <div className={module.pendingTasks_box}>
                      <h3>Loading...</h3>
                      <p>Loading...</p>
                      <Checkbox label="Completed" checked={false} />
                    </div>
                  )}
                </div>
              </div>
              <div className={module.second_column}>
                <div className={module.expense_container}>
                  <h2>Expenses</h2>
                  <div className={module.expense_graph_container}>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: [
                            "Electric",
                            "Waterproofing",
                            "Plumbing",
                            "Brickwork",
                            "Foundation",
                            "Structure",
                          ],
                        },
                      ]}
                      series={[
                        {
                          data: [4, 3, 5, 1, 8, 2],
                          label: "Material",
                          stack: "A",
                        },
                        {
                          data: [1, 6, 3, 2, 1, 7],
                          label: "Plumbing",
                          stack: "A",
                        },
                        {
                          data: [2, 5, 6, 1, 4, 3],
                          label: "Estimated",
                          stack: "A",
                        },
                        {
                          data: [3, 1, 6, 2, 4, 5],
                          label: "Machine",
                          stack: "A",
                        },
                      ]}
                      borderRadius={25}
                      width={650}
                      height={500}
                    />
                  </div>
                </div>
                <div className={module.inventoryReport_container}>
                  <h2>Inventory Report</h2>
                  <div className={module.inventory_container}>
                    <h1>hometable</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
