// function to make request to backend using bearer token that is stored in localstorage

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return { error: "token is not available!" };
  }
};

export const setToken = (tokenObj) => {
  localStorage.setItem("accessToken", tokenObj.accessToken);
  localStorage.setItem("refreshToken", tokenObj.refreshToken);
};

export const getRefreshToken = (tokenObj) => {
  const user = JSON.parse(localStorage.getItem("user_data"));
  return user.refreshToken;
};

export const clearToken = (tokenObj) => {
  localStorage.removeItem("user_data");
};
