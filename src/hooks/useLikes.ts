import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../api/firebase";
import { LikedMoviesList } from "../types/likes.type";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const useMovieLikes = (userEmail: string | null, movie: Movie) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["likes", userEmail, movie?.id],
    queryFn: async () => {
      if (!userEmail) return false;
      const likesRef = collection(db, "likes");
      const q = query(likesRef, where("userEmail", "==", userEmail), where("movieId", "==", movie.id));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    },
    enabled: !!userEmail && !!movie,
  });

  const addLike = useMutation({
    mutationFn: async () => {
      if (!userEmail) throw new Error("로그인이 필요합니다.");
      const likesRef = collection(db, "likes");
      await addDoc(likesRef, {
        userEmail,
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes", userEmail, movie.id],
      });
    },
    onError: () => {},
  });

  const removeLike = useMutation({
    mutationFn: async () => {
      if (!userEmail) throw new Error("로그인이 필요합니다.");
      const likesRef = collection(db, "likes");
      const q = query(likesRef, where("userEmail", "==", userEmail), where("movieId", "==", movie.id));
      const querySnapshot = await getDocs(q);
      const batch = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(batch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes", userEmail, movie.id],
      });
    },
    onError: () => {},
  });

  return { data, isLoading, isError, error, addLike, removeLike };
};

export const useLikedMovies = (userEmail: string | null) => {
  return useQuery<LikedMoviesList, Error>({
    queryKey: ["likes", userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error("사용자가 로그인되어 있지 않습니다.");
      const likesRef = collection(db, "likes");
      const q = query(likesRef, where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          movieId: data.movieId,
          poster_path: data.poster_path,
          title: data.title,
          userEmail: data.userEmail,
        };
      });
    },
    enabled: !!userEmail,
  });
};
