import request from './config';

export function api_login(some){
    return request({
        url:API_URL + 'nav/login.php',
        data:some,
        method:'post'
    })
}
