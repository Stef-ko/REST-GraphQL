import http from "../http-common";

class httpRestService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get(`/post/${id}`);
  }

  create(body) {
    return http.post("http://localhost:8080/api/posts/newpost", {
      body: body,
    });
  }

  // update(id, body) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }
}
export default new httpRestService();
