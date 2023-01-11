import { Link, useNavigate} from 'react-router-dom'

import './styles.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'

function MyCharacters ({isDark}) {
  const [myCharacters, setMyCharacters] = useState([]);

  const getMyCharacters = async() => {
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
      setMyCharacters(r.data);
      return r.data;
    } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    getMyCharacters()
  }, [])

  const navigate = useNavigate();
  const handleBackButton =  () => {
  navigate('/menu');
}

  return (
    <main className={(isDark)? "users-char-page-dark" : "users-char-page"}>
    <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <div className='users-warudo-box users-warudo-principalCards'>

      {
        myCharacters.map((item) => (
          <div className='users-warudo-card' key={item.id}>
          <img className='pict' src={item.archetype.picture} alt='combattant effrayant' />
          <div className='persoHeader'>{item.name}</div>
          <div className='users-warudo-description'>{item.archetype.name}</div>
          <button className='users-warudo-modifButtons' onClick={(id)=>{navigate(`/personnages/edition/${item.id}`)}}>
            Modifier
          </button>
        </div>
          )
        )
      }
      
        <button 
          className='users-warudo-createButton'
        >
          <Link className="links" to="/personnages/nouveau">Créer un personnage</Link>
        </button>
      </div>
    </main>
  )
}

export default MyCharacters
