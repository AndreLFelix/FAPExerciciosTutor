import React, { useState } from 'react';
import Board from './componentes/Board';
import axios from 'axios';

function App() {
  const [character, setCharacter] = useState([]);
  
  axios.get("https://rickandmortyapi.com/api/character").then((response) => {
    const respostaApi = response.data.results;
    setCharacter(respostaApi);
  })

  return (
    <div>
      <h1>Aplicativo React de alfabeto</h1>
      <Board />
      {character.map((personagem: any) => {
        return (
          <ul>
            <u>Rick & Morty characters</u>
            <b><li>{personagem.name}</li></b>
            <li>{personagem.species}</li>
            <li>{personagem.status}</li>
            <li>{personagem.origin.name}</li>
            <li>{personagem.location.name}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
