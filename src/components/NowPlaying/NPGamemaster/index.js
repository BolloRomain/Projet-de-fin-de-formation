// ***************** //
// **** IMPORTS **** //
// ***************** //

// **** DEPENDENCIES **** //
import axios from "axios";
import { useEffect, useState } from "react";
import NPHeader from "../NPHeader";
import NPPlayers from "../NPPlayers";

// **** STYLESHEETS **** //
import "./styles.scss";

function NPGamemaster(
  {
    actions,
    activePlayer,
    allPlayers,
    allScenes,
    aScene,
    lastScene,
    gameId,
    gameTitle,
    gmData,
    player,
    theWorld,
  }) {
  const [sceneActions, setSceneActions] = useState([]);
  const [myScene, setMyScene] = useState('');

  const br = <br />;

  const createNewScene = async(myScene, sceneActions) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'post',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/scenes/${gameId}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'POST',
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          text: myScene,
          actions: sceneActions,
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <div className="np-gamemaster-page">
      <NPHeader
        lastScene={lastScene}
        gameTitle={gameTitle}
        gmData={gmData}
        player={player}
        theWorld={theWorld}
      />
      <main className="np-gamemaster-box">
        <form className="ui form"  onSubmit={(e) => {
            e.preventDefault();
              createNewScene(myScene, sceneActions);
             sceneActions.length = 0;
          }}>
          <section className="ui center aligned column character-section world-create-section">
            <h3 className="np-gamemaster-subtitle">
              <i className="book icon" />
              Description de la prochaine scène :
            </h3>
            <div className="column">
              <div className="field">
                <label>
                  <textarea
                    value={myScene}
                    onChange={(e) => {
                      setMyScene(e.target.value);
                    }}
                    required
                  />
                </label>
              </div>
            </div>
          </section>
          <section className="ui center aligned column character-section">
              <h3 className="np-gamemaster-subtitle">
                <i className="shield icon" />
                Sélectionnez les actions possibles :
              </h3>
              {
                actions.map((item) => 
                  (
                    <div
                      className="np-gamemaster-checkbox"
                      key={item.id}
                    >
                      <label
                        className="np-gamemaster-checkbox-label"
                      >
                      <input
                        className="np-gamemaster-checkbox-input"
                        name={item.name}
                        onChange={ (e) => { //TODO: CHECKED AND UNCHECKED ACTIONS
                          if(sceneActions.indexOf(item.id) !== (-1)) {
                            sceneActions.splice(sceneActions.indexOf(item.id), 1);
                            setSceneActions([...sceneActions]);

                          } else {
                            setSceneActions([...sceneActions, item.id]);
                          }
                        }}
                        type="checkbox"
                        value={item.id}
                      />
                        {item.name}
                      </label>
                    </div>
                  )
                )
              }
            </section>
            <div className="character-button">
              <button className="np-gamemaster-save-button np-gamemaster-links" type='submit'>Enregistrer</button>
            </div>
            <hr className='np-gamemaster-divide'></hr>
            <section className="ui center aligned column character-section">
            <h3 className="np-gamemaster-subtitle">
                <i className="history icon" />
                Les scènes précédentes :
              </h3>
            {
              allScenes.map((item) =>
              <div key={item.number}>
                <h3>Tour : {item.number}</h3>
                <p className="np-gamemaster-description" key={item.id}>
                  {item.text}
                </p>
              </div>
              )
            }
            </section>
        </form>
      </main>
      <NPPlayers
        allPlayers={allPlayers}
        activePlayer={activePlayer}
        gmData={gmData}
      />
    </div>
  );
}

export default NPGamemaster;