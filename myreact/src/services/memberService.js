import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/jejumaru_war_exploded/api/member/';

class MemberService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getMemberBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new MemberService();