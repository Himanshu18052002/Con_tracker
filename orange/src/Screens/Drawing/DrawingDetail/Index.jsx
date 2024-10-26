import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuickView from "../../../Components/QuickView/Index";
import DrawingModal from "Modals/DrawingModal";
import module from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { getDrawingRemarks } from "API/getAPI";
import { useSelector } from "react-redux";
import { normalDateStrings } from "utils/DateChange";

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [update, setUpdate] = useState(false);

  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  const location = useLocation();
  const data = location.state.data;

  const openModal = () => {
    setShowModal(true);
  };
  const drawingID = data.id;

  const fetchRemarks = async () => {
    const data = await getDrawingRemarks(accessToken, drawingID);
    setRemarks(data);
  };

  useEffect(() => {
    fetchRemarks();
  }, []);

  const Date = normalDateStrings(data.updated_at);
  const closeModal = () => {
    setShowModal(false);
    setUpdate(false);
  };

  return (
    <>
      <div className="container">
        <QuickView
          button={true}
          onClick={openModal}
          buttonTitle={"Upload"}
          heading={data.name}
        />
        <div className={module.drawingContainer}>
          <div className={module.imageContainer}>
            <img src={data.drawing} alt={data.name} />
          </div>
          <div className={module.contentContainer}>
            <div className={module.text}>
              <h5>Uploaded By :</h5>
              <p>{data.uploaded_by}</p>
            </div>
            <div className={module.text}>
              <h5>Date & Time :</h5>
              <p>{Date}</p>
            </div>
            <div className={module.text}>
              <h5>Details :</h5>
              <p>{data.details}</p>
              <div
                onClick={() => {
                  setUpdate(true);
                  openModal();
                }}
                className={module.updateContainer}
              >
                <FontAwesomeIcon icon={faPen} color="white" />
              </div>
            </div>
            <div className={module.remarksContainer}>
              <h4>Remarks :</h4>
              {remarks.length !== 0 ? (
                remarks.map((item) => (
                  <div key={item.id} className={module.remarksCard}>
                    <h5 style={{ fontSize: "20px", fontWeight: "600" }}>
                      {item.remarked_by}
                    </h5>
                    <p style={{ color: "#707082" }}>{item.remark}</p>
                    <p style={{ color: "#babbbc" }}>{item.date}</p>
                  </div>
                ))
              ) : (
                <h2>No remarks added</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <DrawingModal
        display={showModal}
        data={data}
        show={openModal}
        close={closeModal}
        update={update}
      />
    </>
  );
}

export default Index;
