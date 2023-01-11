import { useEffect, useState } from "react";
import { Card, Grid, Icon, Image, Popup } from "semantic-ui-react";
import gmShield from "../../../assets/images/shield_1.png";
import "./styles.scss"

function NPPlayers({ allPlayers, gmData, activePlayer }) {

  return (
    <Grid className="players-grid" column={1}>
      <Grid.Column>
        <Grid.Row className="players-grid-dm">
          <Popup
            trigger={
              <Image
                src={gmShield}
                alt="Maître du Jeu"
                size={activePlayer === gmData.id ? "big" : "small"}
                disabled={activePlayer === gmData.id ? false : true}
              />
            }
            content={gmData.nickname}
            position='right center'
            />
        </Grid.Row>
        <Grid.Row className="players-grid-icon">
          { allPlayers !== null ?
            allPlayers.map((item) => {
            return (
              <Popup
                key={item.id}
                trigger={
                  <Image
                    src={item.archetype.picture}
                    alt={item.archetype.name}
                    disabled={activePlayer === item.id ? false : true}
                    size={activePlayer === item.id ? "small" : "tiny"}
                  />
                }
                content={item.name}
              />
            );
            })
          : null
          }
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default NPPlayers;