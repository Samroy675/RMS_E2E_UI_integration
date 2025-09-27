import axios from "axios";

// auth.ts
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/auth/login", { email, password }); // calls your AuthController
    return res.data; // { token, user }
  };
  