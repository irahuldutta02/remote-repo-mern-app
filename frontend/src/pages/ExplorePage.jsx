import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Repos } from "../components/Repos";
import { Spinner } from "../components/Spinner";

export const ExplorePage = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const exploreRepos = async (language) => {
    setLoading(true);
    setRepos([]);
    setSelectedLanguage(language);

    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
        {
          headers: {
            authorization: `token ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setRepos(data.items);
    } catch (error) {
      toast.dismiss();
      toast.error("error fetching repos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={() => exploreRepos("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("cpp")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepos("java")}
          />
        </div>
        {repos.length > 0 && (
          <div className="flex justify-center items-center text-center flex-col gap-4 p-8">
            <h2 className="text-xl font-semibold text-center">
              <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
                {selectedLanguage.toUpperCase()}{" "}
              </span>
              Repositories
            </h2>
            <p className="text-sm text-gray-300">with most stars</p>
          </div>
        )}
        {!loading && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && (
          <div className="flex mt-4 p-8 w-full justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
