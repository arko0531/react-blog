export const getPostingDate = (timeStamp) => {
  // 날짜 설정
  const today = new Date(timeStamp);
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return year + '년 ' + month + '월 ' + day + '일';
};
