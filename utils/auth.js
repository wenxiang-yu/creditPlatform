const ID_TOKEN_KEY = 'id_token'
const COName = 'companyname'

export const getToken = () => {
  return uni.getStorageSync(ID_TOKEN_KEY)
}

export const setToken = token => {
	uni.setStorageSync(ID_TOKEN_KEY, token)
}

export const removeToken = () => {
  uni.removeStorageSync(ID_TOKEN_KEY)
}
export const getCname = () => {
  return uni.getStorageSync(COName)
}

export const setCname = par => {
	uni.setStorageSync(COName, par)
}

export const removeCname = () => {
  uni.removeStorageSync(COName)
}


export default { getToken, setToken, removeToken,getCname,setCname ,removeCname}