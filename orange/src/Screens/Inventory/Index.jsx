import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import module from "./inventory.module.css";
import CustomTable from "../../Components/Custom_Table/Index";
import { getInventory, getPurchaseRecord } from "API/getAPI";
import QuickView from "../../Components/QuickView/Index";
import { useSelector } from "react-redux";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";

function Index() {
  const [sortOrder, setSortOrder] = useState({
    material: "asc",
    date: "asc",
    vendor: "asc",
    amount: "asc",
  });
  const [purchaseRecord, setPurchaseRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);

  const accessToken = localStorage.getItem("access");
  const project = useSelector((state) => state.project.project);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getInventory(accessToken, project);
        const data = await getPurchaseRecord(accessToken, project);

        const itemsMap = new Map(
          items.map((item) => [item.id, item.materialName])
        );
        const purchaseRecordsWithItemName = data.map((record) => {
          const itemId = record.materialName;
          const value = itemsMap.has(itemId) ? itemsMap.get(itemId) : "Unknown";
          return { ...record, materialName: value };
        });

        setPurchaseRecord(purchaseRecordsWithItemName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchase record:", error);
      }
    };

    fetchData();
  }, [accessToken, project]);

  const handleSort = (filterType) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [filterType]: prevSortOrder[filterType] === "asc" ? "desc" : "asc",
    }));
  };

  const renderSortIcon = (filterType) => {
    const icon =
      sortOrder[filterType] === "asc" ? (
        <FontAwesomeIcon icon={faSortUp} size="2x" color="white" />
      ) : (
        <FontAwesomeIcon icon={faSortDown} size="2x" color="white" />
      );

    return (
      <button
        className={`sort_button ${filterType}_filter`}
        onClick={() => handleSort(filterType)}
      >
        <p>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</p>
        {icon}
      </button>
    );
  };

  return (
    <div className={module.page_container}>
      <div>
        <div className={module.page_contents}>
          <QuickView heading="Purchase Records" />
          <div className={module.search_filter_container}>
            <div className={module.search_input_container}>
              <input
                type="text"
                placeholder="Search for a material, vendor, type"
              />
              <FontAwesomeIcon icon={faSearch} className={module.search_icon} />
            </div>
            <div className={module.filter_container}>
              <p style={{ color: "black", fontWeight: 600, fontSize: "100%" }}>
                Filter by :{" "}
              </p>
              <div className={module.material_filter}>
                {renderSortIcon("material")}
              </div>
              <div className={module.date_filter}>{renderSortIcon("date")}</div>
              <div className={module.vendor_filter}>
                {renderSortIcon("vendor")}
              </div>
              <div className={module.amount_filter}>
                {renderSortIcon("amount")}
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <CustomTable
            data={purchaseRecord}
            headings={[
              "Material",
              "Date",
              "Quantity",
              "Type",
              "Vendor",
              "Amount",
            ]}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
