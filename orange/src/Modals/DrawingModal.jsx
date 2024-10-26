import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./DrawingModal.css";
import { addDrawings } from "API/postAPI";
import { updateDrawing } from "API/putAPI";

function DrawingModal({ show, close, display, data = {}, update = false }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(update ? data?.name : "");
  const [detail, setDetail] = useState(update ? data?.details : "");
  const inputRef = useRef(null);
  const accessToken =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  const Uploadz = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleClose = () => {
    close();
    setName("");
    setDetail("");
  };

  const handleAddDrawings = async () => {
    try {
      const formData = new FormData();
      formData.append("drawing", image);
      formData.append("name", name);
      formData.append("details", detail);
      formData.append("parent_option", "22");

      await addDrawings(accessToken, formData);
    } catch (err) {
      console.log("Error uploading drawing", err);
      alert("An Error Occurred while uploading the Drawings");
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("drawing", image);
      } else if (data) {
        formData.append("drawing", data.drawing);
      }
      formData.append("name", name);
      formData.append("details", detail);
      formData.append("parent_option", "22");
      await updateDrawing(accessToken, formData, data.id);
      setName("");
      setDetail("");
    } catch (err) {
      console.log("Error uploading drawing", err);
      alert("An Error Occurred while uploading the Drawings");
    }
  };

  return (
    <div className={`modal_drawing ${display ? "show" : ""}`}>
      <div className="modal_content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="modal_container">
          <div className="left_part">
            <h3>Upload Drawings</h3>
            <div className="upload_drawings" onClick={handleUpload}>
              <div style={{ width: "140px" }}>
                <img
                  src={require("../assets/images/+-removebg-preview.png")}
                  alt="upload"
                />
                <p>upload image</p>
              </div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                onChange={Uploadz}
                type="file"
              />
              <div className="uploaded_image">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="uploaded" />
                ) : update ? (
                  <img src={data.drawing} alt="uploaded" />
                ) : null}
              </div>
            </div>
          </div>
          <div className="right_part">
            <div className="drawing_details">
              <h5>Name</h5>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                value={name}
              />
            </div>
            <div className="drawing_details">
              <h5>Details</h5>
              <input
                type="text"
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Enter Detail"
                value={detail}
              />
            </div>
          </div>

          <div className="upload_button">
            {update ? (
              <button onClick={handleUpdate}>Update</button>
            ) : (
              <button onClick={handleAddDrawings}>Upload</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawingModal;
