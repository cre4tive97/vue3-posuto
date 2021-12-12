import Cookies from "cookies-ts";

const cookies = new Cookies();

function saveAuthToCookie(value: string): void {
  cookies.set("posuto_auth", value);
}

function saveUserToCookie(value: string): void {
  cookies.set("posuto_user", value);
}

function getAuthFromCookie(): string | null {
  return cookies.get("posuto_auth");
}

function getUserFromCookie(): string | null {
  return cookies.get("posuto_user");
}

function deleteCookie(value: string): void {
  cookies.remove(value);
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};
