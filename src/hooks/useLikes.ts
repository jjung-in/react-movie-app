import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../api/firebase';
import { LikedMovie } from '../types/likes.type';
import { MovieDetails } from '../types/movie.type';

const getLikesForUserAndMovie = async (userEmail: string, movieId: number) => {
  const likesRef = collection(db, 'likes');
  const q = query(likesRef, where('userEmail', '==', userEmail), where('movieId', '==', movieId));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

export const useMovieLikes = (userEmail: string | null, movie: MovieDetails) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['likes', userEmail, movie?.id],
    queryFn: async () => {
      if (!userEmail) return false;
      const querySnapshot = await getLikesForUserAndMovie(userEmail, movie.id);
      return !querySnapshot.empty;
    },
    enabled: !!userEmail && !!movie,
  });

  const addLike = useMutation({
    mutationFn: async () => {
      if (!userEmail) throw new Error('로그인이 필요합니다.');
      const likesRef = collection(db, 'likes');
      await addDoc(likesRef, {
        userEmail,
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userEmail, movie.id],
      });
    },
    onError: (error) => {
      console.error('Error adding like:', error);
    },
  });

  const removeLike = useMutation({
    mutationFn: async () => {
      if (!userEmail) throw new Error('로그인이 필요합니다.');
      const querySnapshot = await getLikesForUserAndMovie(userEmail, movie.id);
      const batch = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(batch);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', userEmail, movie.id],
      });
    },
    onError: (error) => {
      console.error('Error removing like:', error);
    },
  });

  return { data, isLoading, isError, error, addLike, removeLike };
};

export const useLikedMovies = (userEmail: string | null) => {
  return useQuery<LikedMovie[], Error>({
    queryKey: ['likes', userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error('사용자가 로그인되어 있지 않습니다.');
      const likesRef = collection(db, 'likes');
      const q = query(likesRef, where('userEmail', '==', userEmail));
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
