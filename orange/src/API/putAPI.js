import rootAPI from "./rootAPI";

export const updateIssue = async (token, data, id) => {
  console.log("token", token, " and Id is ", id);
  await rootAPI
    .put(`/issue/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => alert("Issue status has been updated succesfully"))
    .catch((err) => {
      console.log("error occured in the API section", err);
      throw err;
    });
};

export const updateTask = async (token, data, id) => {
  console.log(token);
  await rootAPI
    .put(`/tasks/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("Task status has been updated succesfully");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const updateConsumptionRecords = async (token, data, id) => {
  await rootAPI
    .put(`inventory/ConsumptionRecord/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("record status has been updated succesfully");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const updateDrawing = async (token, data, id) => {
  console.log(data);
  await rootAPI
    .put(`drawings/drawings/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => alert("Record updated successfully"))
    .catch((err) => {
      throw err;
    });
};
