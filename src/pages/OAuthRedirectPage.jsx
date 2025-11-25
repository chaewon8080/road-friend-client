import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {

    console.log(window.location.href);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

      if (!token) return;  // token 없으면 아무것도 안 함

  localStorage.setItem("accessToken", token);
  navigate("/");
  }, []);

  return <div>로딩중..</div>;
}
