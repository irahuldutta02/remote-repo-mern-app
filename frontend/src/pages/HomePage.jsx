import { useCallback, useEffect, useState } from "react";
import { ProfileInfo } from "../components/ProfileInfo";
import { Repos } from "../components/Repos";
import { Search } from "../components/Search";
import { Spinner } from "../components/Spinner";
import { SortRepos } from "../components/sortRepo";

import toast from "react-hot-toast";

export const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [error, setError] = useState(null);

  const getUserProfileRepos = useCallback(
    async (usernane = "irahuldutta03") => {
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
    },
    []
  );

  useEffect(() => {
    getUserProfileRepos();
  }, [getUserProfileRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    await getUserProfileRepos(username);
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
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
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
    </div>
  );
};
