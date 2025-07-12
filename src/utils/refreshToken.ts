import {APIBASIC} from '../constant/API';
import {storage} from './storage';

export const refreshToken = async () => {
  const userid = storage.getString('userId');
  const telepon = storage.getString('telepon');
  const token = storage.getString('token');
  const refreshtoken = storage.getString('refreshToken');
  try {
    const result = await APIBASIC.post('auth/RefreshToken', {
      user_id: userid,
      telepon,
      token,
      refresh_token: refreshtoken,
    });
    return result.data;
  } catch (err) {
    console.log('err refresh token >> ', err);
  }
};
