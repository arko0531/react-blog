import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { FileInputProps } from 'types/ui-interface';

const FileInput = ({
  inputEl,
  fileName,
  setFileName,
  setAttachment
}: FileInputProps) => {
  const handleFileInput = useCallback((e: Event) => {
    const { files } = e.target as HTMLInputElement;
    const theFile = files?.[0];

    if (files && files[0]) {
      setFileName(files[0].name);
    }

    const reader = new FileReader();

    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const result = finishedEvent.target?.result as string;
      setAttachment(result);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }
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

  return (
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
  );
};

export default FileInput;

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
