import { QuerySnapshot } from 'firebase/firestore';

export interface PostInfo {
  title: string;
  content: string;
  userEmail: string | null;
  postId: string;
  imageURL: string;
  imageName: string;
  timeStamp: number;
}

export interface SearchInfo {
  onSearchPost: (e: React.FormEvent<HTMLFormElement>) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search?: string;
}

export interface SearchProps {
  firstPostKey?: QuerySnapshot | null;
  setFirstPostKey?: React.Dispatch<React.SetStateAction<any | null>>;
  lastPostKey?: QuerySnapshot | null;
  setLastPostKey?: React.Dispatch<React.SetStateAction<any | null>>;
}

export interface SearchValueInfo {
  searchValue?: string;
}

export interface PostsReducerInfo {
  posts: PostInfo[];
  searchValue: string;
}
