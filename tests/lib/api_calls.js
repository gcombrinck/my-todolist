import axios from 'axios';

export class APIRequest {
    GET = async (baseURL, endpoint, params) => {
        try {
            return await axios({
                baseURL,
                url: endpoint,
                method: 'get',
                params,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => response).catch(error => error.response);
        } catch (err) {
            console.error(err);
        }
    };

    POST = async (baseURL, endpoint, data) => {
        try {
            return await axios({
                baseURL,
                url: endpoint,
                method: 'post',
                data,
                 headers: {'Content-Type': 'multipart/form-data' }
            }).then(response => response).catch(error => error.response);
        } catch (err) {
            console.error(err);
        }
    };
}