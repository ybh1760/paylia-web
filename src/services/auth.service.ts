import dayjs from "dayjs";

import { CookieKey } from "@/constants";
import { removeCookie, setCookie } from "@/helpers";
import { JwtToken } from "@/models";

import { api } from "./base.service";

export const setTokens = (token: JwtToken) => {
  const expires = dayjs().add(1, "year").toDate();
  setCookie(CookieKey.ACCESS_TOKEN, token.access, { expires });
  setCookie(CookieKey.REFRESH_TOKEN, token.refresh, { expires });
};
export const removeTokens = () => {
  removeCookie(CookieKey.ACCESS_TOKEN);
  removeCookie(CookieKey.REFRESH_TOKEN);
};

class AuthService {
  async signIn(): Promise<JwtToken> {
    const token = await api.post<JwtToken>("/auth/sign-in", {});
    setTokens(token);

    return token;
  }
}

export default new AuthService();
