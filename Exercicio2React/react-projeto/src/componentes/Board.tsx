import React, {useState} from 'react';

function Board(){
    const [letter, setLetter] = useState(String.fromCharCode(65));

    const changeLetter = (direction: 'next' | 'previous') => {
      const codigoAtual = letter.charCodeAt(0);
  
      if (direction === 'next') {
        if (codigoAtual >= 65 && codigoAtual < 90) {
          setLetter(String.fromCharCode(codigoAtual + 1));
        } else {
          setLetter('A');
        }
      } else if (direction === 'previous') {
        if (codigoAtual > 65 && codigoAtual <= 90) {
          setLetter(String.fromCharCode(codigoAtual - 1));
        } else {
          setLetter('Z');
        }
      }
  }
    return(
        <div>
            <h1>Letra: {letter}</h1>
            <button onClick={() => changeLetter('previous')}>Letra Anterior</button>
            <button onClick={() => changeLetter('next')}>Próxima Letra</button>
        </div>
    );
}

export default Board;