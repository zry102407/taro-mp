const apiPrefix = '/Action'
import apiConfig from '../utils/api.config'

const api = {
    login: (params) => {
        return apiConfig.get(`${apiPrefix}/LoginHandler.ashx?action=Login`, params)
    }
}

export default api;
