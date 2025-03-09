import { useMutation } from '@tanstack/react-query';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api/firebase';

interface AuthProps {
  email: string;
  password: string;
}

const join = async ({ email, password }: AuthProps) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const login = async ({ email, password }: AuthProps) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const logout = async () => {
  await signOut(auth);
};

export const useJoin = () => {
  return useMutation({
    mutationFn: join,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
