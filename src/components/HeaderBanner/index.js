import { useState } from "react";
import { PropTypes } from "prop-types";
import {useNavigate} from 'react-router-dom';
import { Menu, Sidebar } from "semantic-ui-react";
import "./styles.scss";

import tree from './../../assets/images/header-icones/foret.png';
import profil from './../../assets/images/header-icones/utilisateur.png';
import swords from './../../assets/images/header-icones/sword.png';
import personnage from './../../assets/images/header-icones/personnage.png';
import home from './../../assets/images/header-icones/deconnexion.png';
import sun from './../../assets/images/header-icones/soleil.png'
import moon from './../../assets/images/header-icones/lune.png'
import burger from './../../assets/images/header-icones/menudark.png';
import darkburger from './../../assets/images/header-icones/menu.png';
import rules from './../../assets/images/header-icones/scroll.png'

function HeaderBanner({ component , isDark , setIsDark }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  function handleLink() {
    navigate('/menu');
    setIsMenuOpen(false)
  }
  function handleLink1() {
    navigate('/profil');
    setIsMenuOpen(false)
  }
  function handleLink2() {
    navigate('/parties');
    setIsMenuOpen(false)
  }
  function handleLink3() {
    navigate('/mondes');
    setIsMenuOpen(false)
  }
  function handleLink4() {
    navigate('/personnages');
    setIsMenuOpen(false)
  }
  function handleLink6() {
    navigate('/');
    setIsMenuOpen(false);
    setTimeout(localStorage.removeItem('userToken'),100);
  }
  function handleLink7() {
    navigate('/regles');
    setIsMenuOpen(false)
  }
	return (
    <header className={ (isDark) ? "floating-header-dark" : "floating-header" }>
		<div>
		</div>
      <img
        className={ (isDark) ? "floating-header-icon-dark" : "floating-header-icon" }
        src={ (isDark) ? sun : moon }
        alt={(isDark) ? "logo soleil" : "logo lune"}
        onClick={() => { setIsDark(current => !current) }}
      />
      <img
        className={ (isDark) ? "floating-header-usermenu-icon-dark" : "floating-header-usermenu-icon" }
        src={(isDark ? darkburger : burger)}
        alt="menu"
        onClick={() => {
          setIsMenuOpen(current => !current)
        }}
      />
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          direction="right"
          icon='labeled'
          inverted={isDark ? true : false}
          onHide={() => setIsMenuOpen(false)}
          vertical
          visible={isMenuOpen}
          className={(isDark)? "sidebar-dark" : "sidebar"}
          width='thin'
        >
          <div className={(isDark)? "menu-dark" : "menu"}>
          <div as='a' onClick={handleLink}  className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className="header-banner-logo">O'Dice & Dragons</h3>  </div>
          <div as='a' onClick={handleLink1} className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Mon Profil</h3>
          <img src={profil} alt="personne" className="menu-images"/>
          </div>
          <div as='a' onClick={handleLink2} className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Mes parties</h3>
            <img src={swords} alt="épées" className="menu-images"/>
          </div>
          <div as='a' onClick={handleLink3} className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Mes mondes</h3>
              <img src={tree} alt="arbre" className="menu-images"/>
          </div>
          <div as='a' onClick={handleLink4} className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Mes personnages</h3>
          <img src={personnage} alt="personnage" className="menu-images"/>
          </div>
          <div as='a' onClick={handleLink7} className={isDark ? "menu-division-dark" : "menu-division"}>
              <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Règles du jeu</h3>
              <img src={rules} alt="parchemin" className="menu-images"/>
          </div>
          <div onClick={handleLink6} className={isDark ? "menu-division-dark" : "menu-division"}>
            <h3 className={isDark ? "menu-title-dark" : "menu-title"}>Deconnexion</h3>
          <img src={home} alt="accueil" className="menu-images"/>
          </div>
          </div>
        </Sidebar>
        <Sidebar.Pusher dimmed={isMenuOpen}>
        {component}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </header>
	);
}

HeaderBanner.propTypes = {
	component: PropTypes.node.isRequired,
};

export default HeaderBanner;