import { Link , useNavigate} from 'react-router-dom';
import './styles.scss';
import book from './book.png';
import swords from './swords.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MyGames({ isDark }) {
  const [allGames, setAllGames] = useState([]);
  const [gmGames, setGmGames] = useState([]);
  const [myGames, setMyGames]= useState ([]);

  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();

  const handleGameState = (item) => {
    switch(item.state) {
      case 'waiting': return 'En attente de joueurs';
      case 'ready': return 'Prête à être lancée';
      case 'in_progress': return 'Partie en cours';
      case 'game_over': return 'Partie terminée';
      default: return 'Partie'
    }
  };

  const joinGmGames = async(id) => {
    try {
      const r = await axios({
        method: 'post',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/${id}/join/gm`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'POST',
          Authorization: `Bearer ${userToken}`,
        }
      });
      navigate(`${id}/reprendre`);
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * API request for data for all games
   * @returns data
   */
  const loadGames = async() => {
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setAllGames(r.data.allGames)
      setGmGames(r.data.gameMasterGames)
      setMyGames(r.data.playingGames)
      return    r.data.allGames
                
      } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    loadGames();
  }, [])

  const handleBackButton =  () => {
    navigate('/menu');

  }
  
  const handleCreate = () => {
    navigate("/parties/nouveau");
  }

return (
  <>
 <main className={( isDark )? "my-games-dark" : "my-games"}>
    <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
    <h1 className='my-games-title'>Liste des parties</h1>
    <div className='my-games-box'>
    <h2 className='my-games-subtitle my-games-subtitle-allgames'>Toutes mes parties</h2>
      <hr className='my-games-divide my-games-divide-subtitle'></hr>    
      <h2 className='my-games-subtitle'>Mes Parties Joueur</h2>
      <hr className='my-games-divide my-games-divide-subtitle'></hr>
      {myGames.map((item) =>
        <div 
          className='my-games-container'
          onChange={(e) => {
            setMyGames([e.target.value])
          }}
          key={item.id}
        >
          <img src={swords} className='my-games-logo-swords' alt="logo d'épées" />
          <button className='my-games-allButtons' value={item.id} onClick={(id)=>{navigate(`${item.id}/reprendre`)}}>
          Rejoindre
          </button>
          <p className='my-games-centeredContent my-games-centeredContent-state' key={item.id}>{handleGameState(item)}</p>
          <p className='my-games-centeredContent'>{item.name}</p>

          <hr className='my-games-divide'></hr>
        </div>
      )}

      <h2 className='my-games-subtitle'>Mes Parties Maître du Jeu</h2>
      <hr className='my-games-divide'></hr>
      {gmGames.map((item) =>
        <form
          key={item.id}
          onSubmit={(e) => {
            e.preventDefault();
            joinGmGames(item.id);
          }}
        >
          <div
            className='my-games-container'
            onChange={(e) => {
              setGmGames([e.target.value])
            }}
            key={item.id}
          >
          
            <img src={book} className='my-games-logo-swords' alt="logo d'épées" />
            <button className='my-games-allButtons'>
            Rejoindre
            </button>
            <p className='my-games-centeredContent my-games-centeredContent-state' key={item.id}>{handleGameState(item)}</p>
            <p className='my-games-centeredContent'>{item.name}</p>
            <hr className='my-games-divide'></hr>
          </div>
        </form>
      )}

      <h2 className='my-games-subtitle my-games-subtitle-allgames'>Toutes les parties</h2>
      <hr className='my-games-divide'></hr>
      {allGames.map((item) =>
        <div
          className='my-games-container'
          onChange={(e) => {
            setAllGames([e.target.value])
          }}
          key={item.id}
        >
          <img src={swords} className='my-games-logo-books' alt="logo d'un livre" />
          <button className='my-games-allButtons' value={item.id} onClick={(id)=>{navigate(`${item.id}/rejoindre`)}}>
          Rejoindre
          </button>

          <p className='my-games-centeredContent my-games-centeredContent-state' key={item.id}>{handleGameState(item)}</p>
          <p className='my-games-centeredContent'>{item.name}</p>
          <hr className='my-games-divide'></hr>
        </div>
      )}
    </div>
    <button className='my-games-create-button' onClick={handleCreate}>
          Créer une partie
      </button>
  </main>
  </>
)
}

export default MyGames;
