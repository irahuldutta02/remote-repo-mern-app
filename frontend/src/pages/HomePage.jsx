import { useCallback, useEffect, useState } from "react";
import { ProfileInfo } from "../components/ProfileInfo";
import { Repos } from "../components/Repos";
import { Search } from "../components/Search";
import { Spinner } from "../components/Spinner";
import { SortRepos } from "../components/sortRepo";
import { useDebounce } from "../hooks/useDebounce";

import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [error, setError] = useState(null);

  const { authUser } = useAuthContext();

  const getUserProfileRepos = useCallback(async (usernane) => {
    setError(null);
    setSortType(null);
    setRepos([]);
    setUserProfile(null);

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_URL}/api/user/profile/${usernane}`
      );
      if (!res.ok) {
        throw new Error("User Not Found");
      }
      const { userProfile, repos } = await res.json();
      setUserProfile(userProfile);
      setRepos(repos);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedGetUserProfileRepos = useDebounce(getUserProfileRepos, 500);

  useEffect(() => {
    if (authUser) {
      getUserProfileRepos(authUser.username);
    }
  }, [getUserProfileRepos, authUser]);

  const onSearch = (e, username) => {
    e.preventDefault();
    debouncedGetUserProfileRepos(username);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      setRepos((prevRepos) =>
        prevRepos.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
      setSortType(sortType);
    }
    if (sortType === "forks") {
      setRepos((prevRepos) => prevRepos.sort((a, b) => b.forks - a.forks));
      setSortType(sortType);
    }
    if (sortType === "stars") {
      setRepos((prevRepos) =>
        prevRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      );
      setSortType(sortType);
    }
  };

  return (
    <div className="m-4">
      {!authUser && (
        <div className="flex w-full justify-center items-center bg-glass p-8 mt-10 h-96 rounded-lg gap-12 flex-col text-center">
          <div className="flex justify-center items-center w-20">
            <img src="/public/logo.svg" alt="logo" />
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-3xl">Welcome to Remote Repo</h1>
            <p className="text-xl text-white">Please login or signup to continue</p>
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
      {authUser && <Search onSearch={onSearch} />}
      {authUser && repos.length > 0 && (
        <SortRepos onSort={onSort} sortType={sortType} />
      )}
      {authUser && (
        <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
          {!error && userProfile !== null && !loading && (
            <ProfileInfo userProfile={userProfile} />
          )}
          {!error && !loading && <Repos repos={repos} />}
          {loading && (
            <div className="flex w-full justify-center items-center">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="flex w-full justify-center items-center bg-glass p-8 mt-10 h-96 rounded-lg">
              <h1 className="text-2xl text-white">{error.message}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
