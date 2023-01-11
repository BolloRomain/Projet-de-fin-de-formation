import { Link , useNavigate } from "react-router-dom";
import "./styles.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import egg from "./../../assets/images/egg_4.png";

function MyWorlds({isDark}) {
  
  const [allWorlds, setAllWorlds] = useState([]);
    
  const listMyWorlds = async(name, synopsis) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'get',
        url: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/worlds/",
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        },
        data : {
          name: name,
          synopsis: synopsis,
        }
      });
      setAllWorlds(r.data)
    } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    listMyWorlds();
  }, [] );

  const navigate = useNavigate();
  const handleBackButton =  () => {
  navigate('/menu');
}

 const handleCreateButton = () => {
  navigate("/mondes/nouveau");
 }

  return (
    <main className={(isDark)? "users-warudo-page-dark" : "users-warudo-page"}>
      <button onClick={handleBackButton} className={(isDark)?"back-button-dark": "back-button"}>Retour</button>
      <div className='users-warudo-box users-warudo-principalCards'>
        {allWorlds.map((item) => {
          return (
            <div className='users-warudo-card' key={item.id}>
            <img src={egg} alt="oeuf" className="worlds-images"/>
            <div className=''>{item.name}</div>
            <div className='users-warudo-description'>{
              item.synopsis}</div>
              <button className='users-warudo-modifButtons' onClick={(id)=> {navigate(`/mondes/edition/${item.id}`);}}>
                Modifier
              </button>
            </div>
          )
        })}
        <button className='users-warudo-createButton'  onClick={handleCreateButton}>
        Créer un monde
        </button>
      </div>
      
    </main>
  )
}

export default MyWorlds