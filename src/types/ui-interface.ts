export interface ButtonProps {
  $color?: string;
  $width?: string;
  $bgColor?: string;
  $disabled?: boolean;
  [property: string]: any;
  children: React.ReactNode;
}

export interface FormLabelInputProps {
  label: string;
  id: string;
  $width?: string;
  $height?: string;
  [property: string]: any;
}

export interface InputProps {
  id?: string;
  $width?: string;
  $height?: string;
  [property: string]: any;
}

export interface TextAreaProps {
  id?: string;
  label?: string;
  $width?: string;
  $height?: string;
  [property: string]: any;
}

export interface PostButtonWrapperProps {
  onWritePost: () => void;
}

export interface FileInputProps {
  inputEl: React.RefObject<HTMLInputElement>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setAttachment: React.Dispatch<React.SetStateAction<string>>;
}
