declare module '*.png';
declare module 'uuid' {
  const v4: () => string;

  export { v4 };
}
