export const API = import.meta.env.PROD
  ? "https://fristroop-projects-chat-server.nckxno.easypanel.host"
  : "http://localhost:3000";
console.log(API);
