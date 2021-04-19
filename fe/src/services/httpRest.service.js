import http from "../http-common";

class httpRestService {
  getAll() {
    return http.get("/post");
  }

  get(id) {
    return http.get(`/post/${id}`);
  }

  create(body) {
    return http.post("/post", data);
  }

  update(id, body) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/post/${id}`);
  }
}
export default new httpRestService();
