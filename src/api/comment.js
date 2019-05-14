
import request from './config';

export function api_getComment(some){
    return request({
        url:API_URL + 'nav/getComment.php',
        data:some,
        method:'post'
    })
}
