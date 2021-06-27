const apiPrefix = '/Action'
import apiConfig from '../utils/api.config'

const api = {
    login: (params) => {
        return apiConfig.get(`${apiPrefix}/LoginHandler.ashx?action=Login`, params)
    },
    logout: (params) => {
      return apiConfig.get(`${apiPrefix}/LoginHandler.ashx?action=LoginOut`, params)
    },
    getUserInfo: (params) => {
      return apiConfig.get(`${apiPrefix}/IndexHandler.ashx?action=GetMain_Info`, params)
    },
    getClassifyList: (params) => {
      return apiConfig.get(`${apiPrefix}/DHHandler.ashx?action=GetLblist_C`, params)
    },
    getSubClassifyList: (params) => {
      return apiConfig.get(`${apiPrefix}/DHHandler.ashx?action=GetLblist_C`, params)
    },
    getIndexConfig: () => {
      return apiConfig.get(`${apiPrefix}/IndexHandler.ashx?action=GetSyBuJu`)
    },
    getAlwaysBuy: (params) => {
      return apiConfig.get(`${apiPrefix}/DHHandler.ashx?action=GetPHList_CG`, params)
    }
}

export default api;
