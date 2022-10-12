// import axios from "axios";

// const API_URL = "http://localhost:9090";

// const register = (userName, userFirstName, userLastName, userPassword)=>{
//     return axios.post(API_URL + "/registerNewUser",{
//         userName,
//         userFirstName,
//         userLastName,
//         userPassword
//     });
// };

// const login =async (userName,userPassword)=>{
//     const response = await axios.post(API_URL + "/authenticate", {
//         userName,
//         userPassword,
//     });
//     if (response.data.jwtToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
// };

// const logout =()=>{
//     localStorage.removeItem("user");
// };

// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
// };

// const AuthService ={
//     register,
//     login,
//     logout,
//     getCurrentUser
// };

// export default AuthService;