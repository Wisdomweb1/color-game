import React, { useState, useEffect } from "react";

const App = () => {
  const colorShades = {
    teal: ["rgb(0, 128, 128)", "rgb(0, 110, 110)", "rgb(0, 100, 100)", "rgb(0, 90, 90)", "rgb(0, 80, 80)", "rgb(0, 70, 70)"],
    olive: ["rgb(128, 128, 0)", "rgb(110, 110, 0)", "rgb(100, 100, 0)", "rgb(90, 90, 0)", "rgb(80, 80, 0)", "rgb(70, 70, 0)"],
    maroon: ["rgb(128, 0, 0)", "rgb(110, 0, 0)", "rgb(100, 0, 0)", "rgb(90, 0, 0)", "rgb(80, 0, 0)", "rgb(70, 0, 0)"],
    indigo: ["rgb(75, 0, 130)", "rgb(65, 0, 115)", "rgb(55, 0, 100)", "rgb(45, 0, 85)", "rgb(35, 0, 70)", "rgb(25, 0, 55)"],
    cyan: ["rgb(0, 255, 255)", "rgb(0, 230, 230)", "rgb(0, 2import React, { useState, useEffect } from "react";

const App = () => {
  const colorShades = {
    teal: ["rgb(0, 128, 128)", "rgb(0, 110, 110)", "rgb(0, 100, 100)", "rgb(0, 90, 90)", "rgb(0, 80, 80)", "rgb(0, 70, 70)"],
    olive: ["rgb(128, 128, 0)", "rgb(110, 110, 0)", "rgb(100, 100, 0)", "rgb(90, 90, 0)", "rgb(80, 80, 0)", "rgb(70, 70, 0)"],
    maroon: ["rgb(128, 0, 0)", "rgb(110, 0, 0)", "rgb(100, 0, 0)", "rgb(90, 0, 0)", "rgb(80, 0, 0)", "rgb(70, 0, 0)"],
    indigo: ["rgb(75, 0, 130)", "rgb(65, 0, 115)", "rgb(55, 0, 100)", "rgb(45, 0, 85)", "rgb(35, 0, 70)", "rgb(25, 0, 55)"],
    cyan: ["rgb(0, 255, 255)", "rgb(0, 230, 230)", "rgb(0, 210, 210)", "rgb(0, 190, 190)", "rgb(0, 170, 170)", "rgb(0, 150, 150)"],
    plum: ["rgb(221, 160, 221)", "rgb(200, 145, 200)", "rgb(180, 130, 180)", "rgb(160, 115, 160)", "rgb(140, 100, 140)", "rgb(120, 85, 120)"]
  };

  const getRandomColor = () => Object.keys(colorShades)[Math.floor(Math.random() * Object.keys(colorShades).length)];

  const [targetColor, setTargetColor] = useState(getRandomColor);
  const [shuffledColors, setShuffledColors] = useState([]);
  const [correctColor, setCorrectColor] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Test your color recognition skills in this fun and fast-paced color guessing game!  Challenge yourself and improve your color perception!");

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("highScore", highScore);
    }
  }, [highScore]);

  const startNewGame = () => {
    setScore(0);
    generateNewRound();
  };

  const generateNewRound = () => {
    const newTargetColor = getRandomColor();
    const shades = [...colorShades[newTargetColor]];
    const selectedCorrectColor = shades[Math.floor(Math.random() * shades.length)];
    setCorrectColor(selectedCorrectColor);
    setShuffledColors(shades.sort(() => Math.random() - 0.5));
    setTargetColor(newTargetColor);
    setGameStatus("Guess the correct shade of " + newTargetColor + "!");
  };

  const handleGuess = (color) => {
    if (color === correctColor) {
      const newScore = score + 10;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setGameStatus("Correct!  Next Color...");
      setTimeout(generateNewRound, 1000);
    } else {
      setGameStatus("Wrong! Try again.");
      const newScore = Math.max(0, score - 3);
      setScore(newScore);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 relative  p-5 sm:p-8 md:p-10 lg:p-12 w-full sm:w-4/5 md:w-3/5 lg:w-3/12 mx-auto bg-green-600 ">
      <div><h1></h1></div>
      <div className="absolute top-4 right-1  text-lg font-bold">Highest Score: {highScore}</div>
      <h2 className="text-xl font-bold text-red-800 my-7 text-center">Color Guessing Game</h2>
      <div
        data-testid="colorBox"
        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg border-2 border-black shadow-lg mb-4"
        style={{ backgroundColor: correctColor }}
      ></div>

      <div data-testid="colorOption" className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
        {shuffledColors.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            className="p-5 rounded-full border-2 border-black shadow-lg"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>

      <p data-testid="gameStatus" className="mt-4 text-sm sm:text-base px-5 text-gray-400 font-semibold">{gameStatus}</p>
      <p data-testid="score" className="text-lg sm:text-xl md:text-2xl">{`Score: ${score}`}</p>

      <button
        data-testid="newGameButton"
        onClick={startNewGame}
        className="mt-4 bg-red-700 text-white px-6 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl shadow-md hover:bg-red-500"
      >
        New Game
      </button>
    </div>
  );
};

export default App;
10, 210)", "rgb(0, 190, 190)", "rgb(0, 170, 170)", "rgb(0, 150, 150)"],
    plum: ["rgb(221, 160, 221)", "rgb(200, 145, 200)", "rgb(180, 130, 180)", "rgb(160, 115, 160)", "rgb(140, 100, 140)", "rgb(120, 85, 120)"]
  };

  const getRandomColor = () => Object.keys(colorShades)[Math.floor(Math.random() * Object.keys(colorShades).length)];

  const [targetColor, setTargetColor] = useState(getRandomColor);
  const [shuffledColors, setShuffledColors] = useState([]);
  const [correctColor, setCorrectColor] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Test your color recognition skills in this fun and fast-paced color guessing game!  Challenge yourself and improve your color perception!");

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("highScore", highScore);
    }
  }, [highScore]);

  const startNewGame = () => {
    setScore(0);
    generateNewRound();
  };

  const generateNewRound = () => {
    const newTargetColor = getRandomColor();
    const shades = [...colorShades[newTargetColor]];
    const selectedCorrectColor = shades[Math.floor(Math.random() * shades.length)];
    setCorrectColor(selectedCorrectColor);
    setShuffledColors(shades.sort(() => Math.random() - 0.5));
    setTargetColor(newTargetColor);
    setGameStatus("Guess the correct shade of " + newTargetColor + "!");
  };

  const handleGuess = (color) => {
    if (color === correctColor) {
      const newScore = score + 10;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setGameStatus("Correct!  Next Color...");
      setTimeout(generateNewRound, 1000);
    } else {
      setGameStatus("Wrong! Try again.");
      const newScore = Math.max(0, score - 3);
      setScore(newScore);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 relative border-2 p-5 sm:p-8 md:p-10 lg:p-12 w-full sm:w-4/5 md:w-3/5 lg:w-3/12 border-blue-600 mx-auto bg-red-200">
      <div><h1></h1></div>
      <div className="absolute top-4 right-1  text-lg font-bold">Highest Score: {highScore}</div>
      <h2 className="text-xl font-bold text-red-800 my-7 text-center">Color Guessing Game</h2>
      <div
        data-testid="colorBox"
        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg border-2 border-black shadow-lg mb-4"
        style={{ backgroundColor: correctColor }}
      ></div>

      <div data-testid="colorOption" className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
        {shuffledColors.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            className="p-5 rounded-full border-2 border-black shadow-lg"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>

      <p data-testid="gameStatus" className="mt-4 text-sm px-5 sm:text-base text-gray-400 font-semibold">{gameStatus}</p>
      <p data-testid="score" className="text-lg sm:text-xl md:text-2xl">{`Score: ${score}`}</p>

      <button
        data-testid="newGameButton"
        onClick={startNewGame}
        className="mt-4 bg-red-700 text-white px-6 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl shadow-md hover:bg-red-500"
      >
        New Game
      </button>
    </div>
  );
};

export default App;
