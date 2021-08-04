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
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      try {
        let key = `token-${response.user.username}`;
        await Storage.instance.store(key, response.token);
        key = `id-${response.user.username}`;
        await Storage.instance.store(key, JSON.stringify(response.user));
        return true;
      } catch (err) {
        return response;
      }
    } catch (err) {
      console.log('Login error', err);
      throw Error(err);
    }
  };

  logout = async () => {
    try {
      const allkeys = await Storage.instance.getAllKeys();
      console.log(allkeys)

      const tokens = allkeys.filter(key => key.includes('token-'));
      await Storage.instance.multiRemove(tokens);

      const ids = allkeys.filter(key => key.includes('id-'));
      await Storage.instance.multiRemove(ids);

      console.log(allkeys);

      return true;
    } catch (err) {
      console.log('logout err', err);
      return false;
    }
  };

  signup = async body => {
    try {
      let request = await fetch(
        `https://django-backend-grg.herokuapp.com/users/signup/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      let response = await request.json();
      if (typeof response.username == 'string') {
        return response.username;
      } else {
        return response;
      }
    } catch (err) {
      console.log('signup err', err);
      throw Error(err);
    }
  };

  getUser = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const data = allKeys.filter(key => key.includes('id-'));
      const user = await Storage.instance.get(data.toString());
      //console.log(JSON.parse(user));
      return JSON.parse(user);
    } catch (err) {
      console.log('Get user err', err);
    }
  };

  getToken = async username => {
    try {
      const key = `token-${username}`;
      return await Storage.instance.get(key);
    } catch (err) {
      console.log('Get token error', err);
    }
  };
}

export default UserSession;
