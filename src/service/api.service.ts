const apiPrefix = '/lingdingApi'
import apiConfig from '../utils/api.config'
const api = {
    login: (params) => {
        return apiConfig.get('/lingdingApi/LoginHandler.ashx?action=Login', params)
    }
}

export default api;
