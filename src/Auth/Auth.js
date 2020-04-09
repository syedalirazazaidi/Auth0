import auth0 from "auth0-js";
export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLINT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URI,
      audience : process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }
  login = () => {
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error:${err.error} check the console for further `);
        console.log("error");
      }
    });
  };
  setSession = (authResult) => {
    const expireAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("acces_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expireAt);
  };
  isAuthenticated() {
    const expireAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expireAt;
  }
  logout = () => {
    localStorage.removeItem("acces_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile=null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLINT_ID,
      returnTo: "http://localhost:3000",
    });
  };
  getAccessToken = () => {
    const accessToken = localStorage.getItem("acces_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };
}
