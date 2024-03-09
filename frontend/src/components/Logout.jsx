import { toast } from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogoutFunction = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      setAuthUser(null);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Link to={`/${authUser?.username}`}>
        <img
          src={
            authUser?.avatarUrl ||
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          }
          className="w-10 h-10 rounded-full border border-gray-800"
        />
      </Link>

      <div
        className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
        onClick={handleLogoutFunction}
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};
