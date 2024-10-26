import { normalDateStrings } from "utils/DateChange";
import RootApi from "./rootAPI";

export const getIssue = (storedAccessToken, project) => {
  console.log("from Api side", project);
  return RootApi.get(`/issue?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then((response) => {
      const issuesData = response.data.map((issue) => ({
        id: issue.id,
        text: issue.description,
        date: normalDateStrings(issue.created_at),
        assigned_to: issue.assigned_to,
        resolved: issue.status,
        project: issue.project,
        stage: issue.stage,
        raised_by: issue.raised_by,
      }));
      return issuesData;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
};

export const getTasks = (storedAccessToken, project) => {
  return RootApi.get(`tasks?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then((response) => {
      const tasksData = response.data.map((task) => ({
        id: task.id,
        text: task.task_description,
        date: normalDateStrings(task.updated_at),
        raisedBy: task.created_by,
        status: task.status,
        project: task.project,
      }));
      return tasksData;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getPurchaseRecord = (storedAccessToken, project) => {
  return RootApi.get(`inventory/PurchaseRecord?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then((response) => {
      const PurchaseRecordData = response.data.map((PurchaseRecord) => ({
        id: PurchaseRecord.id,
        materialName: PurchaseRecord.item,
        price: PurchaseRecord.bill_amount,
        date: "NA",
        quantity: PurchaseRecord.quantity,
        type: PurchaseRecord.material_type,
        vendor: PurchaseRecord.vendor,
        bill_image: PurchaseRecord.bill_image,
      }));
      return PurchaseRecordData;
      // inventory data getting from api
    })
    .catch((err) => {
      console.error("error fetching data ", err);
    });
};

export const getInventory = (storedAccestoken, project) => {
  return RootApi(`inventory/item?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccestoken}`,
    },
  })
    .then((response) => {
      const inventoryItem = response.data.map((inventory) => ({
        id: inventory.id,
        materialName: inventory.name,
        type: inventory.grade ? inventory.grade : "Good",
        unit: inventory.unit ? inventory.unit : "Unknown",
        description: inventory.description
          ? inventory.description
          : "Not Provided",
        brand: inventory.brand ? inventory.brand : "Local",
      }));
      return inventoryItem;
      // inventory data getting from api
    })
    .catch((err) =>
      console.log("error occured in the API section Inventory Item")
    );
};

export const getAttendance = (storedAccestoken, project) => {
  return RootApi.get(`staff/staff-attendance?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccestoken}`,
    },
  })
    .then((response) => {
      const attendanceData = response.data.map((attendances) => ({
        id: attendances.id,
        date: attendances.date,
        staff_count: attendances.staff_count,
        staff_type: attendances.staff_type,
      }));
      return attendanceData;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getTypes = (storedAccesstoken, project) => {
  return RootApi.get(`staff/staff-subtype?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  })
    .then((response) => {
      const type = response.data.map((types) => ({
        id: types.id,
        type: types.type,
        staff_category: types.staff_category,
      }));
      return type;
    })
    .catch((err) => console.log("An error occured in the api section ", err));
};

export const getCategory = (storedAccesstoken, project) => {
  return RootApi.get(`staff/staff-category?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  })
    .then((response) => {
      const category = response.data.map((types) => ({
        id: types.id,
        type: types.type,
      }));
      return category;
    })
    .catch((err) => console.log("An error occured in api section ", err));
};

export const getLevel = (storedAccesstoken, project) => {
  return RootApi.get(`project/level?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  }).then((response) => response.data);
};

export const getStage = (storedAccesstoken, project) => {
  return RootApi.get(`inventory/stage?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  }).then((response) => response.data);
};

export const getSubStage = (storedAccesstoken, project) => {
  return RootApi.get(`inventory/substage?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  }).then((response) => response.data);
};

export const getBlock = (storedAccesstoken, project) => {
  return RootApi.get(`project/block?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  }).then((response) => response.data);
};

export const getProject = (storedAccesstoken, project) => {
  return RootApi.get("project", {
    headers: {
      Authorization: `Bearer ${storedAccesstoken}`,
    },
  }).then((response) => response.data);
};

export const getTitleById = (array, id) => {
  const found = array.find((element) => element.id === id);
  return found ? found.title || [found.materialName, found.unit] : null;
};

export const getConsumptionRecord = async (storedAccesstoken, project) => {
  try {
    const [blocks, levels, stages, subStages, inventory] = await Promise.all([
      getBlock(storedAccesstoken, project),
      getLevel(storedAccesstoken, project),
      getStage(storedAccesstoken, project),
      getSubStage(storedAccesstoken, project),
      getInventory(storedAccesstoken, project),
    ]);

    const response = await RootApi.get(
      `inventory/ConsumptionRecord?project_id=${project}`,
      {
        headers: {
          Authorization: `Bearer ${storedAccesstoken}`,
        },
      }
    );

    const consumptionRecords = response.data.map((record) => ({
      id: record.id,
      blockTitle: getTitleById(blocks, record.block),
      levelTitle: getTitleById(levels, record.level),
      stageTitle: getTitleById(stages, record.stage),
      substageTitle: getTitleById(subStages, record.sub_stage),
      i_type: record.i_type,
      item: record.item,
      itemName: getTitleById(inventory, record.item)[0],
      date: normalDateStrings(record.updated_at),
      status: record.arppoval_status,
      quantity: record.quantity,
      units: getTitleById(inventory, record.item)[1],
    }));

    return consumptionRecords;
  } catch (error) {
    console.error("Error fetching consumption records:", error);
    throw error;
  }
};

export const getDrawings = (storedAccessToken, project) => {
  return RootApi.get(`drawings/drawings?project_id=${project}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then((response) => response.data)
    .catch((err) =>
      console.log("An error occured in drawing at API section", err)
    );
};

export const getDrawingRemarks = (storedAccessToken, id) => {
  return RootApi.get(`drawings/drawing-remark`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then((response) => {
      const formatedData = response.data.filter((item) => item.drawing === id);
      return formatedData.map((item) => ({
        id: item.id,
        remark: item.remark,
        remarked_by: item.remarked_by,
        date: normalDateStrings(item.updated_at),
      }));
    })
    .catch((err) =>
      console.log(
        "An error occured during getting remarks in the api section",
        err
      )
    );
};
