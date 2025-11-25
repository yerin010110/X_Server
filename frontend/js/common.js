// 토큰 저장
export function saveToken(token) {
    localStorage.setItem("accessToken", token);
}

// 토큰 가져오기
export function getToken() {
    return localStorage.getItem("accessToken");
}

// 인증 헤더 생성
export function authHeader() {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}
