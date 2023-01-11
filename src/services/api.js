import axios from "axios";

// *************** //
// **** USERS **** //
// *************** //

/**
 * Axios request to get user token
 * stored in local storage
 * @returns user token
 */
export const getUserTokenAtSignIn = async (email, password) => {
  const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'post',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/login_check`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'POST'
      },
      data: {
        username: email,
        password: password,
      }
    });
    localStorage.setItem('userToken', r.data.token);
  } catch (e) {
    console.log('error', e);
  }
}

/**
 * Axios request for user sign-in
 * @returns axios response
 */
export const userSignInData = async (email, password) => {
  const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'get',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/users/infos`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':"GET",
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        username: email,
        password: password,
      }
    });
  } catch (e) {
    console.log('error', e);
  }
}

/**
 * Axios request for user sign-up
 * @returns axios response
 */
export const userSignUpRequest = async (pseudo, email, password) => {
  try {
    const r = await axios({
      method: 'post',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/signup`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'POST'
    },
      data: {
        nickname: pseudo,
        email: email,
        password: password,
      }
    });
  } catch (e) {
    console.log('error', e);
  }
}

export const userDataUpdate = async(email, password, avatar, nickname) => {
  const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'put',
      url: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/users",
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'PUT',
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        username: email,
        password: password,
        avatar: avatar,
        nickname: nickname,
      }
    });
  } catch (e) {
    console.log('error', e);
  }
}

// ******************** //
// **** CHARACTERS **** //
// ******************** //

export const getMyCharacters = async() => {
  const userToken = localStorage.getItem('userToken');

  try {
    const r = await axios({
      method: 'get',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'GET',
        Authorization: `Bearer ${userToken}`,
    }
    });
    return r.data;
  } catch (e) {
    console.log('error', e);
  }
}

export const getArchetypes = async() => {
  try {
    const r = await axios({
      method: 'get',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/archetypes`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'GET'
    }
    });
    return r.data;
  } catch (e) {
    console.log('error', e);
  }
}

export const createNewCharacter = async(userToken, name, archetype) => {
  try {
    const r = await axios({
      method: 'post',
      url: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters",
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'POST',
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        email: name,
        archetype: archetype,
      }
    });
  } catch (e) {
  }
}

export const editMyCharacter = async(characterId, name) => {
  const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'put',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters/${characterId}`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'PUT',
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        name: name,
      }
    });
  } catch (e) {
    console.log('error', e);
  }
}

// **************** //
// **** WORLDS **** //
// **************** //

export const createNewWorld = async(name, synopsis) => {
const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'post',
      url: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/worlds",
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'POST',
        Authorization: `Bearer ${userToken}`,
      },
data : {
    name: name,
    synopsis: synopsis,
}
});
} catch (e) {
  console.log('error', e);
}
}



