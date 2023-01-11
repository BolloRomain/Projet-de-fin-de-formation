import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import voleur from "./../../assets/images/shield_2.png";
import guerrier from "./../../assets/images/shield_4.png";
import paysan from "./../../assets/images/shield_5.png";
import mage from "./../../assets/images/shield_7.png";
import healer from "./../../assets/images/shield_6.png";

import './styles.scss';


function CreateCharacter({isDark}) {

  const [characterName, setCharacterName] = useState('');
  const [archetype, setArchetype] = useState([]);
  const [archetypes, setArchetypes] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const allClass = [voleur, guerrier, paysan, mage, healer];

  function handleLink() {
    navigate('/personnages');
  }

  const getArchetypes = async() => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/archetypes`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setArchetypes(r.data);
      return r.data;
    } catch (e) {
      console.log('error', e);
    }
  }
  
  const createNewCharacter = async(name, archetype) => {
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
          name: name,
          archetype: archetype,
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  const useAllArchetypes = () => {
    getArchetypes()
  }

  useEffect(() => {
    getArchetypes()
  }, [])


  const handleBackButton = () => {
    navigate('/personnages');
  }
  return (
    <main className={(isDark) ? "user-new-warudo-page-dark" : "user-new-warudo-page"}>
      <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <form className="ui form user-new-warudo-box-characters"
        onSubmit={(e) => {
          e.preventDefault();
          createNewCharacter(characterName, archetype);
          handleLink();
        }
        }>
        <h2 className='persoCreateTitle'>Créez votre personnage</h2>
        <section className="ui center aligned column character-section">
          <h3 className="ui horizontal divider header labelsPerso">
            <i className="child icon"></i>
           <p className="sentence"> Nom du personnage :</p>
          </h3>
          <label className="ui">
            <div className="ui input">
              <input type="text" placeholder="Pierre-Yves le Magnifique"
              onChange={(e) => { setCharacterName(e.target.value) }} required />
            </div>
          </label>
        </section>
        <section className="ui center aligned column character-section">
          <h3 className="ui horizontal divider header">
            <i className="shield icon"></i>
            <p className='sentence'>Classe du personnage :</p>
          </h3>
          <div className="ui stackable three column grid center aligned">
            {
              archetypes.map((item) => 
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
                        setArchetype([e.currentTarget.value])
                       }}
                      value={item.id}
                      />
                    <Card
                      className="ui centered card archetype-card">
                    <Image 
                      src={item.picture}
                      alt="class card icon"
                      className='images-class'
                    />
                    <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Description
                      className="description archetype-label-description"
                    >
                      {item.description}
                    </Card.Description>
                    </Card.Content>
                    </Card>
                  </label>
                )
              )
            }
          </div>
        </section>
        <div className="character-button">
          <button className="worldCreateButton" type='submit'>Enregistrer</button>
        </div>
      </form>
    </main>
  );
}
export default CreateCharacter;
