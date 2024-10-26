import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuickView from "../../Components/QuickView/Index";
import "./styles.css";
import DrawingModal from "Modals/DrawingModal";
import { getDrawings } from "API/getAPI";
import Drawingcard from "../../Components/Drawingcards/Index";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";

function Index() {
  const [showModal, setShowModal] = useState(false);
  const [drawingData, setDrawingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");
  const project = useSelector((state) => state.project.project);

  const handleUpload = () => {};
  const openModal = () => {
    setShowModal(true);
  };

  const fecthDrawing = async () => {
    const data = await getDrawings(accessToken, project);
    setDrawingData(data);
    setLoading(false);
  };

  useEffect(() => {
    fecthDrawing();
  }, [accessToken, project]);

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <QuickView
            button={true}
            onClick={openModal}
            buttonTitle={"Add Drawings"}
            heading={"Drawings"}
          />
          <div className="drawingCardsContainer">
            {drawingData
              ? drawingData.map((drawing) => (
                  <Drawingcard open={openModal} data={drawing} />
                ))
              : null}
          </div>
          <DrawingModal
            display={showModal}
            show={openModal}
            close={closeModal}
          />
        </>
      )}
    </>
  );
}

export default Index;
