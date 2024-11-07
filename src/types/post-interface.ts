import { DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';

export interface PostInfo {
  title: string;
  content: string;
  userEmail: string | null;
  postId: string;
  imageURL: string;
  imageName: string;
  timeStamp: number;
}

export interface PostProps {
  posts?: PostInfo[];
  onPrevClick: () => void;
  onNextClick: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

export interface DetailPostInfo {
  postDoc: DocumentReference;
  imageRef: StorageReference;
}

export interface SearchInfo {
  onSearchPost: (e: React.FormEvent<HTMLFormElement>) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search?: string;
}

export interface SearchProps {
  firstPostKey?: QueryDocumentSnapshot | null;
  setFirstPostKey?: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot | null>
  >;
  lastPostKey?: QueryDocumentSnapshot | null;
  setLastPostKey?: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot | null>
  >;
}

export interface SearchValueInfo {
  searchValue?: string;
}

export interface PostsReducerInfo {
  posts: PostInfo[];
  searchValue: string;
}
