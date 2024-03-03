import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to={`/${authUser.username}`} />;
  }

  return (
    <div className="m-4">
      {!authUser && (
        <div className="flex w-full justify-center items-center bg-glass p-8 mt-10 h-96 rounded-lg gap-12 flex-col text-center">
          <div className="flex justify-center items-center w-20">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-3xl">Welcome to Remote Repo</h1>
            <p className="text-xl text-white">
              Please login or signup to continue
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/login"
              className="flex justify-center items-center border bg-glass border-gray-400 w-24 px-4 py-2 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex justify-center items-center border bg-glass border-gray-400 w-24 px-4 py-2 rounded-lg"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
