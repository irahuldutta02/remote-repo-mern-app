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

  const getUserProfileRepos = useCallback(
    async (usernane = "irahuldutta03") => {
      setLoading(true);
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${usernane}`,
          {
            headers: {
              authorization: `token ${
                import.meta.env.VITE_GITHUB_ACCESS_TOKEN
              }`,
            },
          }
        );
        const userProfile = await userResponse.json();
        setUserProfile(userProfile);

        const repoRes = await fetch(userProfile.repos_url);
        const repos = await repoRes.json();
        setRepos(repos);
        setLoading(false);

        return { userProfile, repos };
      } catch (error) {
        toast.error("Error Fetching User Profile");
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
    setSortType(null);
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    try {
      const { userProfile, repos } = await getUserProfileRepos(username);
      if (userProfile.message !== "Not Found") {
        setUserProfile(userProfile);
        setRepos(repos);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
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
        {userProfile?.message !== "Not Found" &&
          userProfile !== null &&
          !loading && <ProfileInfo userProfile={userProfile} />}
        {userProfile?.message !== "Not Found" && !loading && (
          <Repos repos={repos} />
        )}
        {loading && (
          <div className="flex w-full justify-center items-center">
            <Spinner />
          </div>
        )}
        {userProfile?.message === "Not Found" && (
          <div className="flex w-full justify-center items-center bg-glass p-8 mt-10 h-96 rounded-lg">
            <h1 className="text-2xl text-white">User Not Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};
