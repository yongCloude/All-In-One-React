import client from "./client";


/** 로그인 */
export const login = ({email, password}) =>
    client.post('/v2/users/login', {
        email,
        password
    });

/** 회원가입 */
export const register = ({email, password, name, birth, gender, phone}) =>
    client.post('/v2/users/signup', {
        email,
        password,
        name,
        birth,
        gender,
        phoneNumber: phone
    });

/** 이메일 인증번호 */
export const requestEmailAuthNumber = ({email}) =>
    client.post('v2/email', {
        email
    });

/** 이메일 인증번호 확인 요청 */
export const confirmEmailAuthNumber = ({email, emailAuthNumber}) =>
    client.post('v2/email/confirm', {
        email,
        code: emailAuthNumber,
    });

/** 회원 탈퇴 */
export const withdrawal = () => client.delete('/v2/users');



