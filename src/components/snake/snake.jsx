import { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";
import "./snake.css";

const Snake = () => {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [lastKeycode, setLastKeyCode] = useState(38);
  const [start, setStart] = useState(true);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setStart(false);
    setScore(0);
    setLastKeyCode(38);
    canvasRef.current.focus();
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const checkGoBack = (keyCode) => {
    // up
    if (keyCode === lastKeycode) {
      return false;
    } else if (keyCode === 38 && lastKeycode !== 40) {
      // down  (if last button was down, we cant go up)
      return true;
    } else if (keyCode === 40 && lastKeycode !== 38) {
      return true;
    } else if (keyCode === 37 && lastKeycode !== 39) {
      return true;
    } else if (keyCode === 39 && lastKeycode !== 37) {
      return true;
    }

    return false;
  };

  const moveSnake = ({ keyCode }) => {
    keyCode >= 37 &&
      keyCode <= 40 &&
      checkGoBack(keyCode) &&
      setDir(DIRECTIONS[keyCode]);
    setLastKeyCode(keyCode);
  };
  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    // collision with borders
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) {
      return true;
    }

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) {
        return true;
      }
    }
    return false;
  };
  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      let newScore = score + 1;
      setScore(newScore);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const gradient = context.createLinearGradient(0, 0, 0, 23);
    gradient.addColorStop(0, "#43D9AD");
    gradient.addColorStop(1, "#011627");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "#43D9AD";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "#43D9AD";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(), speed);

  return (
    <div className="game-wrapper" role="button" onKeyDown={(e) => moveSnake(e)}>
      <canvas
        className="canvas"
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
        tabIndex={1}
      />

      <div className={gameOver === true ? "game-menu filter" : "game-menu"}>
        {gameOver && <div className="game-over">Game Over!</div>}
        <button
          className={start === true ? "start-game" : "start-game hidden"}
          onClick={startGame}
        >
          Start Game
        </button>
        <button
          className={gameOver === true ? " start-game" : "hidden"}
          onClick={startGame}
        >
          Try Again!
        </button>
      </div>
      <div>
        <p className="score">Score:{score}</p>
      </div>
      <div className="instructions">
        <div className="instructions-text-container">
          <p className="instructions-text">{"//"} use keyboard</p>
          <p className="instructions-text">{"//"} arrows to play</p>
        </div>
      </div>
    </div>
  );
};

export default Snake;
