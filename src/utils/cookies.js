import VueCookies from "vue-cookies";

function saveAuthToCookie(value) {
  // document.cookie = `posuto_auth=${value}`;
  VueCookies.set("posuto_auth", value);
}

function saveUserToCookie(value) {
  // document.cookie = `posuto_user=${value}`;
  VueCookies.set("posuto_user", value);
}

function getAuthFromCookie() {
  // return document.cookie.replace(
  //   /(?:(?:^|.*;\s*)posuto_auth\s*=\s*([^;]*).*$)|^.*$/,
  //   '$1',
  // );
  return VueCookies.get("posuto_auth");
}

function getUserFromCookie() {
  // return document.cookie.replace(
  //   /(?:(?:^|.*;\s*)posuto_user\s*=\s*([^;]*).*$)|^.*$/,
  //   '$1',
  // );
  return VueCookies.get("posuto_user");
}

function deleteCookie(value) {
  // document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  VueCookies.remove(value);
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};
