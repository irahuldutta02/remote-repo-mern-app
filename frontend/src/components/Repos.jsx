import { Repo } from "./Repo";

export const Repos = ({ repos, alwaysFullWidth = false }) => {
  const className = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full bg-glass";

  return (
    <div className={`${className}  rounded-lg px-8 py-6`}>
      <ol className="relative border-s border-gray-200">
        {repos.map((repo) => {
          return <Repo key={repo.id} repo={repo} />;
        })}
        {repos.length === 0 && (
          <p className="flex items-center justify-center h-32">
            No Repositories Found
          </p>
        )}
      </ol>
    </div>
  );
};
