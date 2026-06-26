import { useEffect } from "react";

function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    localStorage.setItem("token", token);

    window.location.href = "/";
  }, []);

  return <h2>Logging in...</h2>;
}

export default OAuthSuccess;