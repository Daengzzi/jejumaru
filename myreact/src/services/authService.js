import axios from "axios";

const API_URL = "http://localhost:8080/jejumaru_war_exploded/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if(response.data.roles.includes("ROLE_BLACKLIST")){
                    return;
                }
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, name) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
            name
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    deleteInfo(username) {
        localStorage.removeItem("user");
        return axios.post(API_URL + "delete", {
            username
        });
    }

    updateInfo(username, password){
        return axios.post(API_URL + "update", {
            username,
            password
        });
    }

    confirmMail(email){
        return axios.post(API_URL + "confirm", {
            email
        });
    }

    subInfo(username) {
        return axios.post(API_URL + "sub", {
            username
        });
    }

    findId(name, email){
        return axios.post(API_URL + "findId",{
            name,
            email
        });
    }

    findPw(username, name, email){
        return axios.post(API_URL + "findPw",{
            username,
            name,
            email
        });
    }

    deleteMembers(mno){
        return axios.post(API_URL +"delete/members", {
            mno
        });
    }
}

export default new AuthService();
