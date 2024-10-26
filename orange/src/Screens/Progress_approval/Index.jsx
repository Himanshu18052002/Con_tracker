import React, { useEffect, useState, useCallback } from "react";
import module from "./progress.module.css";
import QuickView from "../../Components/QuickView/Index";
import ApprovalTable from "../../Components/Progress_approval_table/Index";
import { getConsumptionRecord } from "API/getAPI";
import { useSelector } from "react-redux";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";

function ProgressApprovalScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [records, setRecords] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [loading, setLoading] = useState(true);
  const project = useSelector((state) => state.project.project);
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  const handleHeadingClick = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setSelectedCategory("all");
        break;
      case 1:
        setSelectedCategory("pending");
        break;
      case 2:
        setSelectedCategory("rejected");
        break;
      case 3:
        setSelectedCategory("approved");
        break;
      default:
        setSelectedCategory("all");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await getConsumptionRecord(accessToken, project);
      setRecords(data);
      setIsDataUpdated(false);
    } catch (err) {
      console.log("error occurred while fetching consumption record ", err);
    }
  }, [accessToken, project]);

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [fetchData, isDataUpdated, project]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={module.page_container}>
          <QuickView heading="Progress Approval" />
          <div className={module.top_heading_container_progressApproval}>
            <h2
              onClick={() => handleHeadingClick(0)}
              className={activeIndex === 0 ? `module.active_heading` : ""}
            >
              All
            </h2>
            <h2
              onClick={() => handleHeadingClick(1)}
              className={activeIndex === 1 ? `module.active_heading` : ""}
            >
              Pending
            </h2>
            <h2
              onClick={() => handleHeadingClick(2)}
              className={activeIndex === 2 ? `module.active_heading` : ""}
            >
              Rejected
            </h2>
            <h2
              onClick={() => handleHeadingClick(3)}
              className={activeIndex === 3 ? `module.active_heading` : ""}
            >
              Approved
            </h2>
          </div>
          <div>
            {records.length !== 0 ? (
              <ApprovalTable
                data={records}
                category={selectedCategory}
                setIsDataUpdated={setIsDataUpdated}
              />
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProgressApprovalScreen;
