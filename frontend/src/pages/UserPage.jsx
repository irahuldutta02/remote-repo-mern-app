import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileInfo } from "../components/ProfileInfo";
import { Repos } from "../components/Repos";
import { Search } from "../components/Search";
import { Spinner } from "../components/Spinner";
import { SortRepo } from "../components/sortRepo";
import { VITE_HOST_URL } from "../config/server.config";

export const UserPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let { username } = useParams();

  const getUserProfileRepos = useCallback(async (usernane) => {
    setError(null);
    setSortType(null);
    setRepos([]);
    setUserProfile(null);
    setLoading(true);
    try {
      const res = await fetch(`${VITE_HOST_URL}/api/user/profile/${usernane}`);
      if (!res.ok) {
        throw new Error("User Not Found");
      }
      const { userProfile, repos } = await res.json();
      setUserProfile(userProfile);
      setRepos(repos);
    } catch (error) {
      toast.error(error.message);
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSearch = (e, username) => {
    e.preventDefault();
    navigate(`/${username}`);
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

  useEffect(() => {
    if (username) {
      getUserProfileRepos(username);
    }
  }, [getUserProfileRepos, username]);

  return (
    <div>
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepo onSort={onSort} sortType={sortType} />}

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
