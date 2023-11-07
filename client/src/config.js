export const API = import.meta.env.PROD
  ? "https://api-chat.fristroop.com"
  : "http://localhost:3000";
console.log(API);
