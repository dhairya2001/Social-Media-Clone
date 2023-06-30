import axios from "axios";

export const loginCall = async (userCredential,dispatch) => {
  
    dispatch({ type: "LOGIN_START" });
  
  const PF=process.env.REACT_APP_PUBLIC;
  try {
    const res = await axios.post(PF+"api/users/logIn", userCredential);
    // console.log("login")
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // console.log("failed")
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
