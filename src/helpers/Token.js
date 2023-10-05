import jwtDecode from "jwt-decode";

class Token {
  constructor(token = null) {
    this._token = token;
  }

  set token(token) {
    this._token = token;
  }

  get token() {
    return this._token;
  }
  getId = () => {
    if (!this._token) {
      return null;
    } else {
      const currentUser = jwtDecode(this._token);
      return currentUser;
    }
  };
}

export default new Token();
