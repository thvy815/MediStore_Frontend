export const extractOrderCode = (message: string) => {

  const match = message.match(/[A-Za-z0-9]{8}/); // lấy 8 ký tự liền nhau (có thể là chữ hoặc số)

  return match ? match[0] : null;
};