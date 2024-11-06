export const isKoreanAndEnglishRegex = (value: string) => {
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
  return regex.test(value);
};
