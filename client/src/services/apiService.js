import api from "./api";
import apiFiles from "./apiService";
class ApiService {
  // User
  signin(form) {
    return api.post("/api/user/login", form).then((response) => {
      if (response.data.accessToken) {
        this.setUser(response.data);
      }
      return response;
    });
  }

  isAuthenticated = async () => {
    var output = false;

    return api.get("/api/user/is_authenticated");
  };
  signup(form) {
    return api.post("/api/user", form);
  }
  updateUser(form) {
    return api.put("/api/user", form);
  }

  getPurchaseInvoices = async (companyId) => {
    return api.get(`/api/company/invoices/${companyId}`);
  };
  // Company

  createCompany(form) {
    return api.post("/api/company", form);
  }

  generateAccessTokenForCompany(companyId) {
    return api.post(`/api/company/secret/${companyId}`);
  }
  updateCompany(form) {
    return api.put("/api/company", form);
  }

  getCompanies(userId) {
    return api.get(`/api/company/user/${userId}`);
  }

  /// Local Storage - User
  logout() {
    localStorage.removeItem("user");
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user["refreshToken"] : null;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return user ? user["accessToken"] : null;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export default new ApiService();
