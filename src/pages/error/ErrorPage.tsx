import Error from 'components/error/Error';
import { useRouteError } from 'react-router-dom';
import { ErrorInfo } from 'types/error-interface';

const ErrorPage = () => {
  const error = useRouteError() as ErrorInfo;
  const errorStatus = error.status;

  return (
    <div>
      {errorStatus === 404 ? (
        <Error
          title="404"
          message="페이지가 존재하지 않습니다."
          error={error.message}
        />
      ) : errorStatus === 500 ? (
        <Error
          title="500"
          message="서버 오류가 발생했습니다."
          error={error.message}
        />
      ) : (
        <Error
          message="예기치 못한 오류가 발생했습니다."
          error={error.message}
        />
      )}
    </div>
  );
};

export default ErrorPage;
