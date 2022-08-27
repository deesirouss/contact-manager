import axios from 'axios';
const API_URL = "http://localhost:5000"

//register the user
export const register = (user_name,user_email, user_password) => {
    return axios.post(API_URL + "/user", {
        user_name,
        user_email,
        user_password
    });
};

//login the user
export const login = (user_email, user_password) => {
    return axios.post(API_URL + "/auth/login", {
        user_email,
        user_password
    }).then((res) => {
        //get the token and save it into localstorage 
        // console.log("res=",res);
        if (res.data.accessToken) {
            localStorage.setItem("user_data", JSON.stringify(res.data));
        }
        return res.data

    });
};

//logout the user
export const logout = () => {
    localStorage.removeItem("user_data");
}

//get the currently logged in user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user_data"))
}

