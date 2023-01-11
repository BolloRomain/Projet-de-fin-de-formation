// ***************** //
// **** IMPORTS **** //
// ***************** //

// **** DEPENDENCIES **** //
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// ***** COMPONENTS **** //
import NPPlayer from './NPPlayer';
import NPGamemaster from './NPGamemaster';

// **** STYLESHEETS **** //
import "./styles.scss";

function NowPlaying({isDark}) {

  // **** HOOKS **** //
  const {id} = useParams();
  const location = useLocation();


  // **** LOCAL STATES **** //
  const [isGM, setIsGM] = useState(false);
  const [gmData, setGmData] = useState([]);
  const [isPlayer, setIsPlayer] = useState(true);
  const [gamemasterId, setGamemasterId] = useState('');
  const [player, setPlayer] = useState([]);
  const [playerId, setPlayerId] = useState(0);
  const [allPlayers, setAllPlayers] = useState([]);
  const [lastScene, setLastScene] = useState([]);

  const [allActions, setAllActions] = useState([]);
  const [sceneActions, setSceneActions] = useState([]);
  const [theWorld, setTheWorld] = useState('');
  const [gameTitle, setGameTitle] = useState('');
  const [allScenes, setAllScenes] = useState([]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameState, setGameState] = useState('');

  // **** API REQUESTS **** //

  const userToken = localStorage.getItem('userToken');
  /**
   * API GET request for all game data
   * @return {object} all game data
   */
  const allGameData = async() => {
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/${id}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        },
      });
      setSceneActions(r.data.actionsAvailable);
      setPlayer(r.data.character);
      setGamemasterId(r.data.game.user.id);
      setGmData(r.data.game.user);
      setTheWorld(r.data.game.world.name);
      setGameTitle(r.data.game.name);
      setAllScenes(r.data.game.scenes);
      setActivePlayer(r.data.game.active_player);
      setLastScene(r.data.lastScene.id);
      setGameState(r.data.state);
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * API GET request for an array of all actions
   * @return {object} list of actions
   */
    const listAllActions = async() => {
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/actions`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setAllActions(r.data)
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * API GET request for an array of all players in game
   * @param {string} name character's name
   * @param {string} classe character's archetype
   * @return {object} list of players
   */
  const listAllPlayers = async(name, classe) => {
    try {
      const r = await axios({
        method: 'get',
        // id de la partie
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/${id}/characters`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        },
        data : {
          name: name,
          classe: classe
        }
      });
      setAllPlayers(r.data)
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * Axios request for user sign-in
   * @returns axios response
   */
  const userSignInData = async (email, password) => {
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
      setPlayerId(r.data.id);
    } catch (e) {
      console.log('error', e);
    }
  }


  // **** SPECIFIC TIMERS **** //  

  useEffect(() => {
    allGameData();
    userSignInData();

  }, [])

  useEffect(() => {
    const refreshAllGameData = setInterval(() => {
      allGameData();
      listAllPlayers();
      listAllActions();
    }, 3000);

    return () => clearInterval(refreshAllGameData);
  }, [location]);

  return (
    <div className={(isDark) ? "nowplaying-dark" : "nowplaying"}>
      {
        (gamemasterId === playerId) ?
        <NPGamemaster
          actions={allActions}
          activePlayer={activePlayer}
          allPlayers={allPlayers}
          allScenes={allScenes}
          lastScene={lastScene}
          gameId={id}
          gameTitle={gameTitle}
          gmData={gmData}
          player={player}
          theWorld={theWorld}
        />
        : null
      }         
      {
        (gamemasterId !== playerId) ?
        <NPPlayer
          actions={sceneActions}          
          activePlayer={activePlayer}
          allPlayers={allPlayers}
          allScenes={allScenes}
          lastScene={lastScene}
          gameId={id}
          gamemaster={gamemasterId}
          gameTitle={gameTitle}
          gmData={gmData}
          player={player}
          theWorld={theWorld}
          userToken={userToken}
        />
        : null
      }
    </div>
  );
}

export default NowPlaying;