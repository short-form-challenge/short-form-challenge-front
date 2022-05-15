import { getFavorites, getMyVideos, getVideos } from "apis/videos";
import { QueryResult } from "interface/video";
import { useInfiniteQuery } from "react-query";

const useVideo = (cateId: number = 0, type: "main" | "my" | "liked") => {
  return useInfiniteQuery<QueryResult>(
    ["videos", cateId],
    ({ pageParam }) => {
      console.log(pageParam);
      return type === "main"
        ? getVideos(cateId, 0, 0)
        : type === "my"
        ? getMyVideos(pageParam?.id, pageParam?.showId)
        : getFavorites();
    },
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextPage;
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  );
};

export default useVideo;
