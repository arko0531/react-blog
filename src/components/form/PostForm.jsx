import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../../util/http';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../../firebase';

const PostForm = () => {
  const [attachment, setAttachment] = useState();
  const [postData, setPostData] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const inputEl = useRef(null);
  const [fileName, setFileName] = useState('');

  // 글 생성 / 수정
  const { mutate } = useMutation({
    mutationKey: ['formData'],
    mutationFn: async ({
      title,
      content,
      postingDate,
      userEmail,
      postId,
      imageURL,
      imageName
    }) => {
      await setDoc(doc(db, 'posts', postId), {
        title,
        content,
        postingDate,
        userEmail,
        postId,
        imageURL,
        imageName
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/');
      // if (params) {
      //   navigate(`/posts/${params.postId}`); // 왜 생성하면 여기로 가지 -> 뮤테이션 성공 값이 들어옴 ->
      //   navigate(`/posts/${params.postId}`);
      // }
    }
  });

  // 글 수정
  // 일단 가져옴
  const { data } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: async () => {
      const q = query(
        collection(db, 'posts'),
        where('postId', '==', params.postId)
      );

      const querySnapshot = await getDocs(q);
      const posts = {};
      querySnapshot.forEach((doc) => {
        posts[doc.id] = { id: doc.id, ...doc.data() };
      });
      return posts[Object.keys(posts)[0]];
    },
    enabled: !!params.postId
  });

  useEffect(() => {
    if (data) {
      setPostData(data);
      setFileName(data?.imageName || '');
    }
  }, [data]);

  const handleWritePost = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!fileName) {
      alert('사진을 추가해주세요.');
      return;
    }

    let imageURL;

    // 파일
    if (attachment) {
      // 새로 작성 시 사진
      const storage = getStorage();
      const fileRef = ref(storage, uuidv4());
      await uploadString(fileRef, attachment, 'data_url');
      imageURL = await getDownloadURL(fileRef); // URL
    } else {
      imageURL = data?.imageURL; // 기존 사진 그대로 사용
    }

    const imageName = fileName; // 이름

    // 날짜
    const date = getPostingDate();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const postingDate = date;
    const userEmail = user.email;
    const postId = params.postId ? params.postId : uuidv4();

    mutate({
      title,
      content,
      postingDate,
      userEmail,
      postId,
      imageURL,
      imageName
    });

    setAttachment('');
    setFileName('');
  };

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    const theFile = files[0]; // file url

    // file name
    if (files && files[0]) {
      setFileName(e.target.files[0].name);
    }

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  }, []);

  useEffect(() => {
    if (inputEl.current !== null) {
      inputEl.current.addEventListener('input', handleFileInput);
    }
    return () => {
      inputEl.current &&
        inputEl.current.removeEventListener('input', handleFileInput);
    };
  }, [inputEl, handleFileInput]);

  const getPostingDate = () => {
    // 날짜 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    return year + '년 ' + month + '월 ' + day + '일';
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <StyledPostForm onSubmit={handleWritePost}>
        <PostTitle>{postData ? '게시글 수정' : '새 게시글 작성'}</PostTitle>

        <Input
          label="제목"
          type="text"
          id="title"
          width="100%"
          defaultValue={postData?.title || ''}
          placeholder="제목을 입력해주세요."
          required
        />
        <TextAreaWrapper>
          <TextLabel>내용</TextLabel>
          <TextArea
            label="내용"
            type="text"
            id="content"
            width="100%"
            height="400px"
            placeholder="내용을 입력해주세요."
            defaultValue={postData?.content || ''}
            required
          />
        </TextAreaWrapper>

        <FileContainer>
          <label htmlFor="file">
            <InputFile>
              <AttachmentButton>🔗 FILE UPLOAD</AttachmentButton>
              {fileName ? (
                <AttachedFile className="file-name">{fileName}</AttachedFile>
              ) : (
                ''
              )}
            </InputFile>
          </label>
          <NoneInput type="file" id="file" accept="image/*" ref={inputEl} />
        </FileContainer>

        <ButtonWrapper>
          <Button type="submit"> 작성</Button>
          <Button type="button" $bgColor="white" onClick={handleCancel}>
            취소
          </Button>
        </ButtonWrapper>
      </StyledPostForm>
    </Wrapper>
  );
};

export default PostForm;

const Wrapper = styled.div`
  width: 85%;
  margin: 60px auto;
  padding: 30px 80px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledPostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 50px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;
  gap: 20px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

  width: ${({ width }) => (width ? `${width}` : '400px')};
  height: ${({ height }) => (height ? `${height}` : '40px')};
`;

const TextLabel = styled.label`
  font-size: 18px;
  margin-top: 20px;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 파일 커스텀
const FileContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 400px;
`;

const InputFile = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 400px;
`;

const NoneInput = styled.input`
  display: none;
`;

const AttachmentButton = styled.div`
  width: fit-content;
  padding: 16px;
  background-color: #191b27;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  width: 210px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const AttachedFile = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #999;
`;
