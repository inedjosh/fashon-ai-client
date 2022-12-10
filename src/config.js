export const baseUrl =
  process.env.NODE_ENV === "production"
    ? " https://funshun-ai.herokuapp.com/api"
    : "http://localhost:4000/api";
