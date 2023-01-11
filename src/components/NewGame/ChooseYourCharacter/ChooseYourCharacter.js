import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Container, Header, Image } from 'semantic-ui-react';
import './styles.scss';

function ChooseYourCharacter() {

  const [zaWarudo, setZaWarudo] = useState('');
  const [aboutZaWarudo, setAboutZaWarudo] = useState('');
  const [myCharacters, setMyCharacters] = useState([]);
  const [myFighter, setMyFighter] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const userToken = localStorage.getItem('userToken');

  const { id } = useParams();
  const navigate = useNavigate();

  // ------------------------------------
  // Rejoindre une partie en tant que joueur
  // POST http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/ID_GAME/join/ID_CHARACTER

  // Pas de json
  // TOKEN svp
  // [4:46 PM]
  // ------------------------------------
  // Rejoindre une partie en tant que MJ
  // POST http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/ID_GAME/join/gm


  // Pas de json
  // TOKEN svp


  const getMyCharacters = async() => {
  
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters_available`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setMyCharacters(r.data);
      return r.data;
    } catch (e) {
      console.log('error', e);
    }
  }

  const getZaWarudo = async() => {
  
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/worlds/15`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
      }
      });
      setZaWarudo(r.data.world.name);
      setAboutZaWarudo(r.data.world.synopsis)
      return r.data;
    } catch (e) {
      console.log('error', e);
    }
  }

  const selectMyFighter = async(characterId) => {
    try {
      const r = await axios({
        method: 'post',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games/${id}/join/${characterId}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'POST',
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (e) {
      console.log('error', e);
    } finally {
      handleLink();
    }
  }

  /**
   * Forces dynamic link to join game as DM as a string
   * @param {number} id game id
   * @returns link as string
   */
  const joinGameLinkToStr = (id) => {
    return `../parties/${id}/reprendre`
  }

  function handleLink() {
    navigate(`/jeu/${id}`);
  };

  const handleBackButton = () => {
    navigate('/parties');
  };

  const handleNewCharacter = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    getMyCharacters()
    getZaWarudo()
  }, [])

  // useEffect(() => {
  //   navigate('/personnages/nouveau')
  // }, [isClicked === true])

  return (
    <main className="choose-your-character-page">
    <button onClick={handleBackButton} className="back-button">Retour</button>
      <h2 className='choose-your-character-title'>Choisissez votre personnage</h2>
      <div className='choose-your-character-box'>
        <Container fluid>
        <h2 className='choose-your-character-subtitle'>Le monde : {zaWarudo}</h2>
        <p className='choose-your-character-description'>
          {aboutZaWarudo}
        </p>
        </Container>
        <form className=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log(myFighter);
            // handleLink();
            selectMyFighter(myFighter)
          }
          }>
          <section className="ui center aligned column character-section">
          <hr className='choose-your-character-divide'></hr>
            <h3 className="choose-your-character-subtitle">
              <i className="shield icon"></i>
              Je choisis mon personnage :
            </h3>
            <button 
              className='choose-your-character-create-button'
            >
             <Link to='/'>
              J'en veux un nouveau !
              </Link>
            </button>
            <div className="ui stackable three column grid center aligned">
            
            {
              myCharacters.map((item) => 
                (
                  <label
                    className="column archetype-label"
                    key={item.id}
                    name="class-radio"
                  >
                    <input
                      type="radio"
                      className="archetype-radio"
                      name="class-radio"
                      onClick={(e) => { 
                        setMyFighter([e.currentTarget.value])
                        }}
                      value={item.id}
                      required
                      />
                    <Card
                      className="ui centered card archetype-card">
                    <Image 
                      src={item.archetype.picture}
                      alt="class card icon"
                      className='images-class'
                    />
                    <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    </Card.Content>
                    </Card>
                  </label>
                )
              )
            }
            </div>
          </section>
          <button className='choose-your-character-save-button'>
          {/* TODO:outside of box, must move form around */}
              Rejoindre la partie
          </button>
        </form>
      </div>
    </main>
  );
}

export default ChooseYourCharacter;