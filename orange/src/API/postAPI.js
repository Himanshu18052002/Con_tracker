import rootAPI from "./rootAPI";

export const loginAPI = async (
  /** @type {{ email: string; password: string; }} */ data
) => {
  try {
    console.log(data);
    const res = await rootAPI.post("auth/login", data);
    const token = res.data.access;
    return token;
  } catch {
    console.log("An error occured in the API section");
  }
};

export const addIssue = async (storedAccessToken, data) => {
  try {
    if (!storedAccessToken) {
      throw new Error("Access token is missing");
    }

    const response = await rootAPI.post(
      "https://hemant1977.pythonanywhere.com/api/v1/issue/",
      data,
      {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      }
    );

    console.log("Response:", response);
    alert("Issue raised successfully");
  } catch (error) {
    console.error(
      "Error in API section:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check the access token.");
    }
  }
};

export const addTasks = async (storedAccessToken, data) => {
  try {
    if (!storedAccessToken) {
      throw new Error("Access token is missing");
    }

    const response = await rootAPI.post("/tasks/", data, {
      headers: {
        Authorization: `Bearer ${storedAccessToken}`,
      },
    });

    console.log("Response:", response);
    alert("Task Added successfully");
  } catch (error) {
    console.error(
      "Error in API section:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check the access token.");
    }
  }
};

export const addConsumptionRecords = (storedAccessToken, data) => {
  try {
    if (!storedAccessToken) {
      throw new Error("Access token is missing");
    }

    rootAPI
      .post("inventory/ConsumptionRecord", data, {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then(() => alert("Progress Added successfully"));
  } catch (err) {
    throw err;
  }
};

export const addDrawings = (storedAccessToken, data) => {
  try {
    if (!storedAccessToken) {
      throw new Error("Access token is missing");
    }
    rootAPI
      .post("drawings/drawings", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then(() => alert("Drawing added succesfully"));
  } catch (err) {
    throw err;
  }
};
