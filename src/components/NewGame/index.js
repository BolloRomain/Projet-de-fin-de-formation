import './styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewGame ({isDark}){

  // Options picked by user
  const [nameNewGame, setNameNewGame] = useState('');
  const [newGameWorld, setNewGameWorld] = useState([]);
  const [newGamePlayers, setNewGamePlayers] = useState(0);
  const navigate = useNavigate();
  function handleLink () {
    navigate('/parties');
  }

  // List of options for user to select
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

  const newGameRequest = async () => {
    
    const userToken = localStorage.getItem('userToken')

		try {
			const r = await axios({
				method: 'post',
				url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/games`,
				headers: { 
					"Access-Control-Allow-Origin": "*",
					'Access-Control-Allow-Methods':'POST',
          Authorization: `Bearer ${userToken}`,
		  	},
				data: {
					name: nameNewGame,
					world: newGameWorld,
          players_number: newGamePlayers
				}
			});
			console.log(r.data);
		} catch (e) {
			console.log('error newGameRequest', e);
		}
	}

 useEffect(() => {
    listMyWorlds();
 }, []);

 
 const handleBackButton =  () => {
  navigate('/parties');
}

    return (
        <main className={(isDark) ? "user-game-warudo-create-page-dark" : "user-game-warudo-create-page"}>
        <button onClick={handleBackButton} className={(isDark)? "back-button-dark" :"back-button"}>Retour</button>
        <form className="ui form user-game-warudo-create-box" onSubmit={(e) => {
          newGameRequest(nameNewGame, newGameWorld, newGamePlayers)
          e.preventDefault(); handleLink()
        }} >
        <h2 className="user-game-warudo-create-gameCreateTitle">Créer une nouvelle partie</h2>
        <section className="ui center aligned container">
          <h3 className="ui horizontal divider header">
            <i className="leaf icon"></i>
            <p className='sentence'> Nom de la partie :</p>
            </h3>
          <div className="field">
            <label>
              <input type="text" name="name" placeholder="Nom de la partie" onChange={(event) => {
                setNameNewGame(event.currentTarget.value)
               }} required/>
            </label>
          </div>
        </section>
        <section className="user-game-warudo-create-game-create-section">
          <h3 className="ui horizontal divider header">
            <i className="book icon"></i>
            <p className='sentence'> Choisissez votre monde:</p>
          </h3>
          <div className="column">
            <div className="field">
              <label>
              <select 
                className="ui selection dropdown"
                onChange={(event) => {
                  setNewGameWorld([event.currentTarget.value])
                }} 
                required
              >
                <option>Selectionner un monde</option>
                { allWorlds.map((item)=> 
                  <option 
                    key={item.id}
                    value={item.id}
                  >{item.name}</option>
                )}
              </select>
              </label>
            </div>
          </div>
        </section>
        <section className="user-game-warudo-create-game-create-section">
          <h3 className="ui horizontal divider header">
          <i className="users icon"></i>
          <p className='sentence'> Choisissez le nombre de joueurs (2–5):</p>
          </h3>
          <div className="column">
            <div className="field">
              <label htmlFor="players_number">
              <input 
                type="number"
                id="players_number"
                name="players_number"
                min="2" max="5"
                onChange={(event) => {
                  setNewGamePlayers(parseInt(event.currentTarget.value))
                 }}
                required
              />
              </label>
            </div>
          </div>
        </section>        
        <button className="user-game-warudo-create-gameCreateButton" type="submit">Enregistrer</button>
      </form>
    </main>
    );
}


export default NewGame;