import { useState } from "react";

export default function useToken() {
  function getToken(): string | null {
    const tokenString: string | null = sessionStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    sessionStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    deleteToken,
    token,
  };
}
