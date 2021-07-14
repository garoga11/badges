
import Storage from './storage';

class UserSession {
  static instance = new UserSession();

  login = async body => {
    try {
      let request = await fetch(
        `https://django-backend-grg.herokuapp.com/users/login/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = request.json();
      let key = `token-${response.user.username}`;
      await Storage.instance.store(key, response.token);
      return response.user.username;
    } catch (err) {
      console.log('Login error', err);
      throw Error(err);
    }
  };

  logout = async key => {
    try {
      await Storage.instances.remove(key);
      return true;
    } catch (err) {
      console.log('logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      await fetch(`https://django-backend-grg.herokuapp.com/users/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  getToken = async key => {
    try {
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

export default UserSession;
