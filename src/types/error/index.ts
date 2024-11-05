export interface ErrorInfo {
  status: number;
  message: string;
}

export interface ErrorProps {
  title?: string;
  message: string;
  error: string;
}
