import http from "../http-common";

const get = data => {
  return http.get("/users/infos", data);
};

const create = data => {
  return http.post("/signup", data);
};

const findById = id => {
  return http.get(`/users?id=${id}`);
};

const login = data => {
  return http.post("/login_check", data);
}

const UserService = {
  get,
  create,
  findById,
  login
};

export default UserService;
