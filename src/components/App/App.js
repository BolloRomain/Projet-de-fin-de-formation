// ********************** //
// **** DEPENDENCIES **** //
// ********************** //

import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// ******************** //
// **** COMPONENTS **** //
// ******************** //
import Homepage from '../Homepage';
import HeaderBanner from '../HeaderBanner';
import ChooseYourCharacter from '../NewGame/ChooseYourCharacter/ChooseYourCharacter';
import CreateCharacter from '../CreateCharacter';
import CreateWorld from '../CreateWorld';
import EditCharacter from '../EditCharacter';
import EditWorld from '../EditWorld';
import Error403 from '../Error403';
import Error404 from '../Error404';
import Hub from '../Hub';
import Login from '../Login';
import MyCharacters from '../MyCharacters';
import MyGames from '../MyGames';
import MyProfile from '../MyProfile';
import MyWorlds from '../MyWorlds';
import NewGame from '../NewGame';
import NowPlaying from '../NowPlaying';
import Rules from '../Rules';

// ******************** //
// *** STYLESHEETS **** //
// ******************** //

import './App.scss';

function App() {
  //TODO: useLocation for HeaderBanner component prop
  const userToken = localStorage.getItem('userToken');
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/login" element={ <Login />}/>
        {
          (userToken !== null) &&
          <>
            <Route path="/menu" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<Hub isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/profil" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<MyProfile isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/personnages" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<MyCharacters isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/parties" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<MyGames isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/parties/:id/rejoindre" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<ChooseYourCharacter isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/parties/:id/reprendre" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<NowPlaying isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/mondes" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<MyWorlds isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/personnages/nouveau" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<CreateCharacter isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/personnages/edition/:id" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<EditCharacter isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/parties/nouveau" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<NewGame isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/mondes/nouveau" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<CreateWorld isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/mondes/edition/:id" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<EditWorld isDark={isDark} setIsDark={setIsDark}/>} />} />
            <Route path="/jeu/:id" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<NowPlaying isDark={isDark} setIsDark={setIsDark}/>} />}/>
            <Route path="/regles" element={ <HeaderBanner isDark={isDark} setIsDark={setIsDark} component={<Rules isDark={isDark} setIsDark={setIsDark}/>} />} />
          </>
        }
        <Route path="/*" element={userToken !== null ? <Error404/> : <Login />}/>
        <Route path="/403" element={<Error403/>}/>
      </Routes>

      </div>
  );
}

export default App;
