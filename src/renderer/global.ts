// 解决找不到模块报错
declare module '*.css' {
  const content: any;
  export default content;
}
declare module '*.less' {
  const content: any;
  export default content;
}