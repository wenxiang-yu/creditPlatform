import request from '../../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

// 查询公司搜索历史
export const querySearchCHistory =()=> {
    return request({
        url: baseUrl + '/risk/tagHistory/query',
		method:"get"
    })
}
// 查询查看公司历史
export const querySeeCHistory =()=> {
    return request({
        url: baseUrl + '/risk/chooseHistory/query',
		method:"get"
    })
}
//查询品牌查看历史
export const querySeeBHistory =()=> {
    return request({
        url: baseUrl + '/monitoring/chooseHistory/query',
		method:"get"
    })
}

// 查询品牌搜索历史
export const querySearchBHistory =()=> {
    return request({
        url: baseUrl + '/monitoring/tagHistory/query',
		method:"get"
    })
}
//保存企业历史搜索记录
export const saveCHistory =(data)=> {
    return request({
        url: baseUrl + '/risk/tagHistory/save',
		method:"post",
		data
    })
}
// 保存品牌历史搜索记录
export const saveBHistory =(data)=> {
    return request({
        url: baseUrl + '/monitoring/tagHistory/save',
		method:"post",
		data
    })
}
// /monitoring/tagHistory/save
//搜索企业历史列表
export const companyRiskSearch =(data)=> {
    return request({
        url: baseUrl + '/risk/riskCompany/companyRiskSearch',
		method:"post",
		data
    })
}
// 搜索品牌历史列表
export const brandRiskSearch =(data)=> {
    return request({
        url: baseUrl + '/monitoring/popularFeelings/queryBrand',
		method:"post",
		data
    })
}

//删除企业历史记录
export const deleteCHistory =()=> {
    return request({
        url: baseUrl + '/risk/tagHistory/delete ',
		method:"get",
    })
}
// 删除品牌历史记录
export const deleteBHistory =()=> {
    return request({
        url: baseUrl + '/monitoring/tagHistory/delete',
		method:"get",
    })
}
//保存企业历史查看
export const saveCompanyRecord =(data)=>{
	return request({
		url: baseUrl + '/risk/chooseHistory/save',
		method: 'post',
		data,
	})
}
// 删除企业历史查看 
export const deleteCsee =()=> {
    return request({
        url: baseUrl + '/risk/chooseHistory/delete',
		method:"get",
    })
}
// 保存所选品牌记录
export const saveSelectBrandRecord =(data)=> {
  return request({
    url: baseUrl + "/monitoring/chooseHistory/save",
    method: "post",
    data,
  });
}
// 删除品牌历史查看 
export const deleteBsee =()=> {
    return request({
        url: baseUrl + '/monitoring/chooseHistory/delete',
		method:"get",
    })
}


// 获取全部行业列表
export const getAllIndustry =()=> {
    return request({
        url: baseUrl + '/ruoyi-system/industry/groupList',
		method:"get",
    })
}

