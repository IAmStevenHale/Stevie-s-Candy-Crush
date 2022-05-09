import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard';
import blueCandy from './images/blue.png';
import greenCandy from './images/green.png';
import orangeCandy from './images/orange.png';
import purpleCandy from './images/purple.png';
import redCandy from './images/red.png';
import yellowCandy from './images/yellow.png';
import blank from './images/blank.png';

const width = 8;
const candyColours = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

const App = () => {
  const [currentColourArrangement, setCurrentColourArrangement] = useState([]);
  const [squareBeingDragged, setsquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setsquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === blank;
      if (
        columnOfFour.every(
          (square) => currentColourArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);

        columnOfFour.forEach(
          (square) => (currentColourArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === blank;
      if (
        columnOfThree.every(
          (square) => currentColourArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);

        columnOfThree.forEach(
          (square) => (currentColourArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 27, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      if (
        rowOfFour.every(
          (square) => currentColourArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4);

        rowOfFour.forEach(
          (square) => (currentColourArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) {
        continue;
      }
      if (
        rowOfThree.every(
          (square) => currentColourArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3);

        rowOfThree.forEach(
          (square) => (currentColourArrangement[square] = blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColourArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColours.length);
        currentColourArrangement[i] = candyColours[randomNumber];
      }
      if (currentColourArrangement[i + width] === blank) {
        currentColourArrangement[i + width] = currentColourArrangement[i];
        currentColourArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    setsquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setsquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    const squareBeingDraggedID = parseInt(
      squareBeingDragged.getAttribute('data-id')
    );
    const squareBeingReplacedID = parseInt(
      squareBeingReplaced.getAttribute('data-id')
    );
    currentColourArrangement[squareBeingReplacedID] =
      squareBeingDragged.getAttribute('src');
    currentColourArrangement[squareBeingDraggedID] =
      squareBeingReplaced.getAttribute('src');
    const validMoves = [
      squareBeingDraggedID - 1,
      squareBeingDraggedID - width,
      squareBeingDraggedID + 1,
      squareBeingDraggedID + width,
    ];
    const validMove = validMoves.includes(squareBeingReplacedID);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfFour();
    const isARowOfFour = checkForRowOfThree();

    if (
      squareBeingReplacedID &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
    ) {
      setsquareBeingDragged(null);
      setsquareBeingReplaced(null);
    } else {
      currentColourArrangement[squareBeingReplacedID] =
        squareBeingReplaced.getAttribute('src');
      currentColourArrangement[squareBeingDraggedID] =
        squareBeingDragged.getAttribute('src');
      setCurrentColourArrangement([...currentColourArrangement]);
    }
  };

  const createBoard = () => {
    const randomColourArrangement = [];
    for (let index = 0; index < 64; index++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];
      randomColourArrangement.push(randomColour);
    }
    setCurrentColourArrangement(randomColourArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColourArrangement([...currentColourArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColourArrangement,
  ]);

  return (
    <div className='app'>
      <div className='game'>
        {currentColourArrangement.map((candyColour, index) => (
          <img
            key={index}
            src={candyColour}
            alt={candyColour}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <Scoreboard score={scoreDisplay} />
    </div>
  );
};

export default App;
