import { BASE_URL } from "./config.js";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await axios.post(
      //   "http://localhost:8080/api/auth/login",
      //   formData
      // );
     const res = await axios.post(
  `${BASE_URL}/api/auth/login`,
  formData
);  
      ////
      console.log(res.data); // 👈 YAHAN ADD KARNA HAI
      ///// 
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } 
  };

  return (

<div className="auth-container">
    <div className="auth-card">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /> 

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>
        
      
<button
  className="auth-btn"
  // onClick={() => {
  //   window.location.href =
  //     "http://localhost:8080/api/auth/google";
  // }}
  onClick={() => {
  window.location.href =
    `${BASE_URL}/api/auth/google`;
}}
>
  Continue with Google
</button> 

      <div className="auth-link">
        <Link to="/signup">
          Create Account
        </Link>
      </div>
    </div>
  </div> 
  );
}