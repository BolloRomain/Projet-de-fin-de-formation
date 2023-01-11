import './styles.scss';
import cat from './../MyCharacters/cad.jpg';

import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

function EditCharacter({isDark}) {

  const {id} = useParams(); 

  const navigate = useNavigate();
  function handleLink() {
    navigate('/personnages');
  }

  const [oldCharacterData, setOldCharacterData] = useState('');
  const [name, setName] = useState('');


  const editMyCharacter = async(name) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'put',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters/${id}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'PUT',
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          name: name,
        }
      });
      setName(r.data.name);
    } catch (e) {
      console.log('error', e);
    }
  }

  const fetchMyCharacter = async() => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/characters/${id}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      setOldCharacterData(r.data.character.name)
    } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    fetchMyCharacter()
  }, [])

  const handleBackButton = () => {
    navigate('/personnages');
  }

  return (
    <main className={(isDark) ? "user-new-warudo-page-dark" : "user-new-warudo-page"}>
      <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <form className="ui form user-new-warudo-box-edit-character" onSubmit={(e) => {
          e.preventDefault();
          editMyCharacter(name);
          handleLink();
        }
        }>
        <h2 className='editCharacterTitle'>Éditez votre personnage</h2>
        <div className="field">
          <h2 className='sentence'>Nouveau nom du personnage</h2>
          <input
            type="text"
            name="name"
            placeholder={oldCharacterData}
            onChange={(event) => { setName(event.currentTarget.value) }}
            required
          />
        </div>
        {/* <div className="column">
          <div className="image">
          <img className="characterEditImage" src={cat} alt="character edit icon" />
          </div>
        </div> */}
        <button className="worldCreateButton" type="submit">Enregistrer</button>
      </form>
    </main>
  );
}

export default EditCharacter;
