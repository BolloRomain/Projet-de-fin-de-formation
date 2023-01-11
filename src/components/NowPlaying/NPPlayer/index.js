import React from 'react';
import NPActions from '../NPActions';
import NPHeader from '../NPHeader';
import NPPlayers from '../NPPlayers';
import NPScene from '../NPScene';

import "./styles.scss";

function NPPlayer(
  {
    actions,
    allPlayers,
    activePlayer,
    allScenes,
    gameId,
    gmData,
    gameTitle,
    lastScene,
    player,
    theWorld,
    userToken
  }) {

  //TODO: API request -- player picking their action: game id, character id, action id
    return (
        <main className="np-player-page">
          <NPHeader
            gameTitle={gameTitle}
            gmData={gmData}
            lastScene={lastScene}
            player={player}
            theWorld={theWorld}
          />
          <div className="np-player-box">
            <NPActions
              actions={actions}
              activePlayer={activePlayer}
              gameId={gameId}
              gmData={gmData}
              player={player}
              userToken={userToken}
            />
            <NPScene
            allScenes={allScenes}
            />
          </div>
          <NPPlayers
              allPlayers={allPlayers}
              activePlayer={activePlayer}
              gmData={gmData}
            />
        </main>
    );
}

export default NPPlayer;