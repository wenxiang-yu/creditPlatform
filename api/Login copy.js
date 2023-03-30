import request from "../utils/Utils";
export function login(data) {
    return request("/login", "POST", data)
}