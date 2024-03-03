import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Repos } from "../components/Repos";
import { Spinner } from "../components/Spinner";
import { useDebounce } from "../hooks/useDebounce";
import { VITE_HOST_URL } from "../config/server.config";

export const ExplorePage = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [error, setError] = useState(null);

  const exploreRepos = async (language) => {
    setError(null);
    setLoading(true);
    setRepos([]);
    setSelectedLanguage(language);

    try {
      const res = await fetch(
        `${VITE_HOST_URL}/api/explore/repos/${language}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setRepos(data);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedCallback = useDebounce(exploreRepos, 500);

  useEffect(() => {
    exploreRepos("javascript");
  }, []);

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => debouncedCallback("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => debouncedCallback("typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => debouncedCallback("cpp")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => debouncedCallback("python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => debouncedCallback("java")}
          />
        </div>
        {!loading && !error && (
          <div className="flex justify-center items-center text-center flex-col gap-4 p-8">
            <h2 className="text-xl font-semibold text-center">
              <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
                {selectedLanguage && selectedLanguage.toUpperCase()}{" "}
              </span>
              Repositories
            </h2>
            <p className="text-sm text-gray-300">with most stars</p>
          </div>
        )}
        {!loading && !error && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && (
          <div className="flex mt-4 p-8 w-full justify-center items-center">
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
