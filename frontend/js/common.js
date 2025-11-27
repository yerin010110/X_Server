export function saveToken(token) {
    try {
        localStorage.setItem("accessToken", token);
    } catch (err) {
        console.warn("토큰 저장 실패:", err);
    }
}

export function getToken() {
    try {
        return localStorage.getItem("accessToken");
    } catch (err) {
        console.warn("토큰 조회 실패:", err);
        return null;
    }
}

export function authHeader() {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}
