import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'util/http';
import { v4 as uuidv4 } from 'uuid';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString
} from 'firebase/storage';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs
} from 'firebase/firestore';
import { db, auth } from 'firebase.js';
import Input from 'components/ui/input/Input';
import Button from 'components/ui/button/Button';
import FileInput from 'components/ui/input/FileInput';
import FormTitle from 'components/title/FormTitle';
import TextArea from 'components/ui/textArea/TextArea';

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
      userEmail,
      postId,
      imageURL,
      imageName,
      timeStamp
    }) => {
      const postingData = await setDoc(doc(db, 'posts', postId), {
        title,
        content,
        userEmail,
        postId,
        imageURL,
        imageName,
        timeStamp
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/');
      // if (params) {
      //   navigate(`/posts/${params.postId}`); // 왜 생성하면 여기로 가지 -> 뮤테이션 성공 값이 들어옴 ->
      //   navigate(`/posts/${params.postId}`);
      // }
    },
    onError: (error) => {
      alert('에러 발생 : ' + error);
    }
  });

  // 글 수정
  // 일단 가져옴
  const { data } = useQuery({
    queryKey: ['post', params.postId],
    queryFn: async () => {
      const editPostQuery = query(
        collection(db, 'posts'),
        where('postId', '==', params.postId)
      );

      const querySnapshot = await getDocs(editPostQuery);
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

    const title = e.target.title.value;
    const content = e.target.content.value;
    const userEmail = user.email;
    const postId = params.postId ? params.postId : uuidv4();
    const timeStamp = Number(new Date());

    mutate({
      title,
      content,
      userEmail,
      postId,
      imageURL,
      imageName,
      timeStamp
    });

    setAttachment('');
    setFileName('');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <FormTitle>{postData ? '게시글 수정' : '새 게시글 작성'}</FormTitle>
      <StyledPostForm onSubmit={handleWritePost}>
        <Input
          label="제목"
          type="text"
          id="title"
          $width="100%"
          defaultValue={postData?.title || ''}
          placeholder="제목을 입력해주세요."
          required
        />

        <TextArea
          label="내용"
          id="content"
          $width="100%"
          $height="400px"
          placeholder="내용을 입력해주세요."
          defaultValue={postData?.content || ''}
          required
        />

        <FileInput
          inputEl={inputEl}
          fileName={fileName}
          setFileName={setFileName}
          setAttachment={setAttachment}
        />

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

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: flex-end;
  gap: 20px;
`;

// const TextArea = styled.textarea`
//   padding: 10px;
//   border: none;
//   box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

//   width: ${({ $width }) => ($width ? `${$width}` : '400px')};
//   height: ${({ $height }) => ($height ? `${$height}` : '40px')};
// `;

// const TextLabel = styled.label`
//   font-size: 18px;
//   margin-top: 20px;
// `;

// const TextAreaWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;
