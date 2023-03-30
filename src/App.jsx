import { useState } from 'react';

import './index.css';

const App = () => {
  const [val, setVal] = useState('');
  const [characters, setCharacters] = useState(['A', 'B', 'C']);

  const handleAddNewBlock = index => {
    index += 1;

    setCharacters(prev => {
      const start = prev.slice(0, index);
      const end = prev.slice(index);

      return [...start, '', ...end];
    });
  };

  const handleOnShowCharacters = () => {
    if (characters.includes('')) {
      setCharacters(prev => prev.filter(char => char !== ''));
    }

    setVal(characters.join(''));
  };

  const handleEditBlock = (newChar, index) => {
    setCharacters(prev => {
      return prev.map((prevChar, i) => {
        return i === index ? newChar : prevChar;
      });
    });
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='character-box-wrapper'>
          {characters.map((char, i) => (
            <Block
              key={`${char}-${i}`}
              index={i}
              onClick={handleAddNewBlock}
              onChange={handleEditBlock}
            >
              {char}
            </Block>
          ))}
        </div>
        <button type='button' onClick={handleOnShowCharacters} className='show-btn'>
          Show
        </button>
        <div className='display-value'>
          <p>{val}</p>
        </div>
      </div>
    </div>
  );
};

const Block = ({ index, onChange, onClick, children }) => {
  const [character, setCharacter] = useState('');
  const [mode, setMode] = useState('read');

  const handleToggleEdit = e => {
    setMode(prev => (prev === 'read' ? 'write' : 'read'));
  };

  const handleOnChangeCharacter = e => {
    setCharacter(e.target.value);

    if (onChange) {
      onChange(e.target.value, index);
    }
  };

  const handleOnClick = e => {
    e.stopPropagation();

    if (onClick) {
      onClick(index);
    }
  };

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') {
      setMode('read');
    }
  };

  return (
    <div className='character-box' onClick={handleToggleEdit}>
      <div className='new-character-placeholder' onClick={handleOnClick} />
      {mode === 'read' ? (
        children
      ) : (
        <input
          className='input'
          value={character || children}
          onChange={handleOnChangeCharacter}
          onKeyDown={handleOnKeyDown}
          onClick={e => e.stopPropagation()}
          maxLength={1}
        />
      )}
    </div>
  );
};

export default App;
