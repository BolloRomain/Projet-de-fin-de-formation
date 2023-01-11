import { Link } from "react-router-dom";
import "./styles.scss";
import tree from './../../assets/images/header-icones/foret.png';
import profil from './../../assets/images/header-icones/utilisateur.png';
import swords from './../../assets/images/header-icones/sword.png';
import personnage from './../../assets/images/header-icones/personnage.png';
import parchemin from './../../assets/images/header-icones/scroll.png';

function Hub ({isDark}){

  return (
    <main className={(isDark)? "players-hub-page-dark" : "players-hub-page"}> 
    
      <div className="players-hub-box">
      <div className="users-warudo-principalCards">
        <div className="column box-hub">
        
            <div className="image">
            <Link to ="/profil">
            <img src={profil} alt="personne" className="hub-images"/>
            </Link>
            </div>
            <div className="content">
                <div className="header">Mon Profil</div>
                
                {/* <div className="description">
                    <p>Gérer l'avatar, le mail ou le pseudo de mon profil</p>
                </div> */}
                
            </div>
            <button className="hub-button"><Link to="/profil">Gérer mon profil</Link></button>
            
        </div>
        <div className="column box-hub">
            <div className="image">
            <Link to ="/mondes">
            <img src={tree} alt="arbre" className="hub-images"/>
            </Link>
            </div>
            <div className="content">
                <div className="header">Mes Mondes</div>
                
                {/* <div className="description">
                  <p>Gérer tous mes mondes</p>
                </div> */}
            </div>
            <button className="hub-button"><Link to="/mondes">Gérer mes mondes</Link></button>
        </div>
        <div className="column box-hub">
            <div className="image">
            <Link to ="/parties">
            <img src={swords} alt="épées" className="hub-images"/>
            </Link>
            </div>
            <div className="content">
              <div className="header">Mes Parties</div>
                
              {/* <div className="description">
                <p>Gérer toutes mes parties en cours</p>
              </div> */}
            </div>
            <button className="hub-button"><Link to="/parties">Voir mes parties</Link></button>
        </div>
        <div className="column box-hub">
          <div className="image">
          <Link to ="/personnages">
          <img src={personnage} alt="personnage" className="hub-images"/>
          </Link>
          </div>
          <div className="content">
            <div className="header">Mes Personnages</div>
            
            {/* <div className="description">
              <p>Gérer tous mes personnages</p>
            </div> */}
          </div>
          <button className="hub-button"><Link to="/personnages">Gérer tous mes personnages</Link></button>
        </div>
        {/* <div className="last-content"> */}
        <div className="column box-hub">
            <div className="image">
            <Link to ="/regles">
            <img src={parchemin} alt="personne" className="hub-images"/>
            </Link>
            </div>
            <div className="header">Règles du jeu</div>
            <button className="hub-button"><Link to="/regles">Lire les règles du jeu</Link></button>
            
        </div>
      </div>
      </div>
    </main>
  );
}


export default Hub;