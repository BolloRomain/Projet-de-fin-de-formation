import './styles.scss';

import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';



function EditWorld({isDark}) {

  const [oldWorldDataName, setOldWorldDataName] = useState('');
  const [oldWorldDataSynopsis, setOldWorldDataSynopsis] = useState('');

  const {id} = useParams();

  const navigate = useNavigate();
  function handleLink() {
    navigate('/mondes');
  }
  
  const [name, setName] = useState('');
  const [synopsis, setSynopsis] = useState('');


const modifWorld = async(name, synopsis) => {
  const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'put',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/worlds/${id}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'PUT',
          Authorization: `Bearer ${userToken}`,
        },
  data : {
      name: name,
      synopsis: synopsis,
  }
  });
  setName(r.data.name);
  setSynopsis(r.data.synopsis);
  } catch (e) {
    console.log('error', e);
}
}

const fetchMyWorld = async() => {
  const userToken = localStorage.getItem('userToken');
  try {
    const r = await axios({
      method: 'get',
      url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/worlds/${id}`,
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods':'GET',
        Authorization: `Bearer ${userToken}`,
      }
    });
    setOldWorldDataName(r.data.world.name);
    setOldWorldDataSynopsis(r.data.world.synopsis);
  } catch (e) {
    console.log('error', e);
  }
}

useEffect(() => {
  fetchMyWorld()
}, [])

const handleBackButton = () => {
  navigate('/mondes');
}

  return (
    <main className={(isDark) ? "user-edit-warudo-world-page-dark" : "user-edit-warudo-world-page"}>
      <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <form className="ui form user-edit-warudo-world-box-edit-world" onSubmit={(e) => {
          e.preventDefault();
          modifWorld(name, synopsis);
          handleLink();
        }}>
        <h2 className="user-edit-warudo-world-worldCreateTitle">Éditez un monde</h2>
        <section className="ui center aligned container">
          <h3 className="ui horizontal divider header">
            <i className="leaf icon"></i>
            <p className='sentence'>Nouveau nom :</p>
            </h3>
          <div className="field">
            <label>
              <input type="text" name="name" placeholder={oldWorldDataName} 
              onChange={(event) => {
                setName(event.target.value)
               }} required/>
            </label>
          </div>
        </section>
        <section className="user-edit-warudo-world-edit-section">
          <h3 className="ui horizontal divider header">
            <i className="book icon"></i>
            <p className='sentence'> Nouvelle description :</p>
          </h3>
          <div className="column">
            <div className="field">
              <label>
                <textarea placeholder={oldWorldDataSynopsis} onChange={(event) => {
                setSynopsis(event.target.value)
               }} required />
              </label>
            </div>
          </div>
        </section>
        <button className="user-edit-warudo-world-worldCreateButton" type="submit" >
          Enregistrer 
        </button>
      </form>
    </main>
  );
}

export default EditWorld;
