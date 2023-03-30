// 字典接口
import request from '../../utils/request.js'
const baseUrl = process.env.NODE_ENV === 'production' ? '/vm' : '/dev-api/vm'

// 查询公司类型
export const EnterpriseType =()=> {
    return request({
        url: baseUrl + '/ruoyi-system/dict/data/type/risk_company_type',
		method:"get"
    })
}
// 获取注册资本
export const registeredCapital =()=> {
    return request({
        url: baseUrl + '/ruoyi-system/dict/data/type/sys_registered_capital',
		method:"get"
    })
}
//获取成立年限
export const FixedNumberYear =()=> {
    return request({
        url: baseUrl + '/ruoyi-system/dict/data/type/sys_establishment_time',
		method:"get"
    })
}
// 获取企业状态
export const enterpriseState =()=> {
    return request({
        url: baseUrl + '/ruoyi-system/dict/data/type/risk_operating_state',
		method:"get"
    })
}
// 获取参保人数
  export const contributorsIn =()=> {
      return request({
          url: baseUrl + '/ruoyi-system/dict/data/type/risk_insured_quantity',
  		method:"get"
      })
  }
  // 获取电话号码
  export const phoneNumber =()=> {
      return request({
          url: baseUrl + '/ruoyi-system/dict/data/type/risk_phone_number',
  		method:"get"
      })
  }
  // 获取邮箱地址
  export const emailAddress =()=> {
      return request({
          url: baseUrl + '/ruoyi-system/dict/data/type/risk_email_address',
  		method:"get"
      })
  }
  // 获取企业地址
  export const businessAddress =()=> {
      return request({
          url: baseUrl + '/ruoyi-system/dict/data/type/risk_company_address',
  		method:"get"
      })
  }
  // 获取企业网址
  export const corporateWebSite =()=> {
      return request({
          url: baseUrl + '/ruoyi-system/dict/data/type/risk_company_website',
  		method:"get"
      })
  }
  
  