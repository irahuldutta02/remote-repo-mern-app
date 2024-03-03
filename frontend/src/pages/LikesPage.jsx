import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "../utils/functions";
import { FaHeart } from "react-icons/fa";
import { Spinner } from "../components/Spinner";
import { VITE_HOST_URL } from "../config/server.config";

export const LikesPage = () => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLikes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${VITE_HOST_URL}/api/user/likes`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setLikes(data.likedBy);
      } catch (error) {
        setError({
          message: "Something went wrong",
        });
        toast.error("Something wet wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getLikes();
  }, []);

  return (
    <div className=" h-[85vh] max-w-[85vw]  flex justify-center items-start p-2">
      <div className="customTable relative overflow-auto w-full max-h-[90vh]">
        {loading && (
          <div className="w-full text-2xl bg-glass text-white p-16 flex justify-center items-center text-center">
            <Spinner />
          </div>
        )}

        {!loading && !error && likes.length === 0 && (
          <div className="w-full text-2xl bg-glass text-white p-16 flex justify-center items-center text-center">
            <p>No likes yet</p>
          </div>
        )}

        {error && (
          <div className="w-full text-2xl bg-glass text-white p-16 flex justify-center items-center text-center">
            <p>{error.message}</p>
          </div>
        )}

        {!loading && !error && likes.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right bg-glass overflow-hidden">
            <thead className="text-xs uppercase bg-glass">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">No</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {likes.map((like, index) => {
                return (
                  <Fragment key={index}>
                    <tr className="bg-glass border-b">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <span>{index + 1}</span>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 whitespace-nowrap "
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={like.avatarUrl}
                          alt="avatarUrl"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {like.username}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        {formatDate(like.likedDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FaHeart size={22} className="text-red-500 mx-2" />
                          Liked your profile
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
