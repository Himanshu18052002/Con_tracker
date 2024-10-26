import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./progress.module.css";
import Select from "react-dropdown-select";
import {
  getBlock,
  getInventory,
  getLevel,
  getProject,
  getStage,
  getSubStage,
} from "API/getAPI";
import { useSelector } from "react-redux";
import { addConsumptionRecords } from "API/postAPI";

const Index = () => {
  const [formData, setFormData] = useState({
    quantity: "",
    arppoval_status: "pending",
    remarks: "",
    project: "",
    block: "",
    level: "",
    stage: "",
    sub_stage: "",
    item: "",
    i_type: "1",
  });
  const project = useSelector((state) => state.project.project);
  const [options, setOptions] = useState({
    project: [],
    block: [],
    level: [],
    stage: [],
    subStage: [],
    item: [],
  });

  const navigate = useNavigate();
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  useEffect(() => {
    const fetchData = async () => {
      setOptions({
        project: await formatData(
          await getProject(accessToken, project),
          "title1"
        ),
        block: await formatData(await getBlock(accessToken, project), "title"),
        level: await formatData(await getLevel(accessToken, project), "title"),
        stage: await formatData(await getStage(accessToken, project), "title"),
        subStage: await formatData(
          await getSubStage(accessToken, project),
          "title"
        ),
        item: await formatData(
          await getInventory(accessToken, project),
          "materialName"
        ),
      });
    };
    fetchData();
  }, [accessToken, project]);

  const formatData = async (data, key) => {
    return data.map((element, index) => ({
      key: String(index + 1),
      label: element[key],
      value: element.id,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value[0].value }));
  };

  // const handleApprovalStatusChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     arppoval_status: e.target.value,
  //   }));
  // };

  const handleBlockStatusChange = (e) => {
    console.log(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      block: e.target.value,
    }));
  };
  console.log("formData ", formData.block);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await addConsumptionRecords(accessToken, formData);
  };

  return (
    <div className={styles.progress}>
      <form onSubmit={handleSubmit}>
        <h3>Add Progress</h3>
        <div className={styles.itemBox}>
          <h5>Item</h5>
          <Select
            placeholder={"Enter the item"}
            style={{ padding: 10, width: "100%" }}
            onChange={(value) => handleSelectChange("item", value)}
            options={options.item}
          />

          <div className={styles.quantity}>
            <h5>Enter Quantity</h5>
            <input
              type="text"
              name="quantity"
              placeholder="Enter Quantity"
              value={formData.quantity}
              style={{
                width: "25%",
                borderRadius: "10px",
                fontSize: "15px",
                padding: "10px",
                border: "1px solid black",
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* <div>
          <h5>Approval Status</h5>

          <div className={styles.approved}>
            <label>
              <input
                type="radio"
                name="arppoval_status"
                value="approved"
                checked={formData.arppoval_status === "approved"}
                onChange={handleApprovalStatusChange}
              />
              Approved
            </label>

            <label>
              <input
                type="radio"
                name="arppoval_status"
                value="pending"
                checked={formData.arppoval_status === "pending"}
                onChange={handleApprovalStatusChange}
              />
              Pending
            </label>

            <label>
              <input
                type="radio"
                name="arppoval_status"
                value="rejected"
                checked={formData.arppoval_status === "rejected"}
                onChange={handleApprovalStatusChange}
              />
              Rejected
            </label>
          </div>
        </div> */}

        <div>
          <h5>Project</h5>
          <Select
            placeholder={"Enter the Project"}
            style={{ padding: 10, width: "50%" }}
            onChange={(value) => handleSelectChange("project", value)}
            options={options.project}
          />
        </div>

        <div className={styles.blockContainer}>
          <h5>Block</h5>
          <div className={styles.block}>
            {options.block.map((item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="block"
                  value={item.value}
                  // checked={formData.block === item.value}
                  onChange={handleBlockStatusChange}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h5>Level</h5>
          <Select
            placeholder={"Enter the Level"}
            style={{ padding: 10, width: "50%" }}
            onChange={(value) => handleSelectChange("level", value)}
            options={options.level}
          />
        </div>

        <div className={styles.selector}>
          <h5>Stage</h5>
          <Select
            placeholder={"Enter the Stage"}
            style={{ padding: 10, width: "50%" }}
            onChange={(value) => handleSelectChange("stage", value)}
            options={options.stage}
          />
        </div>

        <div>
          <h5>Sub-Stage</h5>
          <Select
            placeholder={"Enter the Sub-stage"}
            style={{ padding: 10, width: "50%" }}
            onChange={(value) => handleSelectChange("sub_stage", value)}
            options={options.subStage}
          />
        </div>

        <div className={styles.itemBox}>
          <h5>Remarks</h5>
          <input
            type="text"
            name="remarks"
            placeholder="Enter Remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            style={{
              width: "60%",
              padding: "10px",
              borderRadius: "10px",
              border: "0.5px solid black",
            }}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">Add Progress Approval</button>
        </div>
      </form>
    </div>
  );
};

export default Index;
