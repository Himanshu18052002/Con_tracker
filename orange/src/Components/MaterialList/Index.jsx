import React from "react";
import module from "./materialList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Index({ materials, itemName }) {
  const navigate = useNavigate();

  const handleRowClick = (materialName) => {
    navigate("/materialScreen", {
      state: {
        materialsWithSameName: materials.filter(
          (data) => data.materialName === materialName
        ),
        purchaseRecord: materials,
      },
    });
  };
  return (
    <div className={module.materialList}>
      <input type="text" placeholder="Search item..." />
      {materials.map((material) => (
        <div
          onClick={() => handleRowClick(material.materialName)}
          key={material.id}
          className={module.materialItem}
        >
          {/* <div className={module.icon}>
            {itemName === material.materialName ? (
              <FontAwesomeIcon color="orange" icon={faFolderOpen} />
            ) : (
              <FontAwesomeIcon color="orange" icon={faFolderClosed} />
            )}
          </div> */}
          <div className={module.details}>
            <h3>{material.materialName}</h3>
            <p>{material.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
