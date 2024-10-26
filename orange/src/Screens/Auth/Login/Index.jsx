import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import module from "./login.module.css";
import { loginAPI } from "API/postAPI";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/loginHandle";
import { useNavigate } from "react-router-dom";
import { getProject } from "API/getAPI";
import { setProject } from "../../../Redux/projectHandler";
import LoadingScreen from "Components/LoadingScreen/LoadingScreen";

function Index() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before making API call
    const data = { email, password };
    try {
      const accessToken = await loginAPI(data);
      if (accessToken) {
        dispatch(login(accessToken));
        localStorage.setItem("access", accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after API call is complete
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {Loading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>Login</h1>
          <div className={module.form_auth}>
            <form onSubmit={handleSubmission}>
              <div className={module.input_container}>
                <label>email </label>
                <input
                  type="text"
                  name="uname"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
              <div className={module.input_container}>
                <label>Password </label>
                <div className={module.inputPassword}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p
                    className={module.password_toggle}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </p>
                </div>
              </div>
              <div className={module.button_container}>
                <input type="submit" value="Login" />
              </div>
            </form>
            <p>Not registered? Register here...</p>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
