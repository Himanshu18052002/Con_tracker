import React from "react";
import "./UtilityModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
function UtilityModal({ updateFunction, deleteFunction, data }) {
  return (
    <div className="utilityModal">
      <ul className="utilityContent">
        <li onClick={() => updateFunction(data)}>
          <FontAwesomeIcon icon={faPen} color="blue" />
          <p>Update</p>
        </li>
        <li onClick={() => deleteFunction(data.id)}>
          <FontAwesomeIcon icon={faTrashCan} color="rgb(255, 94, 94)" />
          <p>Delete</p>
        </li>
      </ul>
    </div>
  );
}

export default UtilityModal;
