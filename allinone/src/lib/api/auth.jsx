import client from './client';


/** 로그인 */
export const login = ({ email, password }) =>
  client.post('/v2/users/login', {
    email,
    password,
  });

/** 회원가입 */
export const register = ({ email, password, name, birth, gender, phone }) =>
  client.post('/v2/users/signup', {
    email,
    password,
    name,
    birth,
    gender,
    phoneNumber: phone,
  });

/** 이메일 인증번호 */
export const requestEmailAuthNumber = ({ email }) =>
  client.post('v2/email', {
    email,
  });

/** 이메일 인증번호 확인 요청 */
export const confirmEmailAuthNumber = ({ email, emailAuthNumber }) =>
  client.post('v2/email/confirm', {
    email,
    code: emailAuthNumber,
  });

/** 회원 탈퇴 */
export const withdrawal = () => client.delete('/v2/users');

/** 친구 목록 **/
export const getFriends = ({ token }) => {
  return client.get(`/v2/users/myfriends`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
};
/** 친구 삭제 **/
export const deleteFriend = ({ token, friend_id }) => {
  client.delete(`/v2/users/myfriends/${friend_id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
};
/** 친구 추가 **/
export const addFriend = ({ token, user_name, user_email }) => {
  client.post('v2/users/myfriends', {
      user_name,
      user_email,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
};