import React, { useState } from 'react';

type Props = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
const Username: React.FC<Props> = ({ username, setUsername }) => {
  const [inputValue, setInputValue] = useState<string>('');

  function saveUsername() {
    if (inputValue) {
      setUsername(inputValue);
      localStorage.setItem('username', inputValue);
      setInputValue('');
    }
  }

  return (
    <div>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={saveUsername}>Send</button>

      {username.length !== 0 && (
        <div>Your username: {username}</div>
      )}
    </div>
  );
};

export default Username;
