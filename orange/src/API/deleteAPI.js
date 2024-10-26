import RootApi from "./rootAPI";

export const deleteIssue = (
  /** @type {any} */ id,
  /** @type {string} */ storedAccessToken
) => {
  RootApi.delete(`/issue/${id}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then(() => {
      alert("Deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting issue:", error);
    });
};

export const deleteTask = (
  /** @type {any} */ id,
  /** @type {string} */ storedAccessToken
) => {
  RootApi.delete(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${storedAccessToken}`,
    },
  })
    .then(() => {
      alert("Deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting issue:", error);
    });
};
