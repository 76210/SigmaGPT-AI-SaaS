import { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
   const navigate = useNavigate(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

   
     //navigate("/");
      // ✅ CORRECT
  navigate("/login");
  
    } catch (err) {
         console.log("ERROR:", err);

  console.log("RESPONSE:", err.response);

  console.log("DATA:", err.response?.data);
     // alert("Signup Failed");
      alert(
    err.response?.data?.message ||
    err.message ||
    "Signup Failed"
  );
    }
  };

  return (
  
     <div className="auth-container">
    <div className="auth-card">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          className="auth-input"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" type="submit">
          Signup
        </button>
         </form>

      <div className="auth-link">
        <Link to="/login">
          Already have an account?
        </Link>
      </div>
    </div>
  </div> 
  );
}

export default Signup;