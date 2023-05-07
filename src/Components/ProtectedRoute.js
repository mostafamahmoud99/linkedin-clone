import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { userState } = useSelector((user) => user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.user) {
      navigate("/", { replace: true });
      return;
    }
  }, [userState.user]);

  return children;
}
