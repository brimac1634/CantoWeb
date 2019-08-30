import axios from 'axios';
import Cookies from 'universal-cookie';

import { connectionError } from './helpers';
import { optionAlert } from '../components/option-alert/option-alert.component';

export default (method, url, data) => {
    const cookies = new Cookies();
    const token = cookies.get('authToken')
    return axios({
        method,
        url,
        data,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token ? token : ''
        }
    }).then(({ data }) => {
        if (data && data.error != null) {
            const { title, message } = data.error;
            optionAlert({
                title,
                message
            })
        }
        return data
    }).catch(err => {
        console.log(err)
        connectionError()
    })   
}