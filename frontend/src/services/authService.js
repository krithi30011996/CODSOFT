import API from "./quizService";

export async function register(data) {
    return API.post(
        "/auth/register",
        data
    );
    return res.data;

}

export async function login(
    data
) {

    return API.post(
        "/auth/login",
        data
    );
    return res.data;

}