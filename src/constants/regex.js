export const isKoreanAndEnglishRegex = (value) => {
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  return regex.test(value);
};
