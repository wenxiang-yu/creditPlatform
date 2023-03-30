import request from "../utils/Utils";
export function getTime(data) {
    return request(`/map/time`, "POST", data)
}