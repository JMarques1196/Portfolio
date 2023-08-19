const CANVAS_SIZE = [240, 400];
const SNAKE_START = [
  [11, 14],
  [11, 15],
  [11, 16],
  [11, 17],
  [12, 17],
  [13, 17],
  [14, 17],
  [14, 18],
  [14, 19],
];
const APPLE_START = [8, 3];
const SCALE = 10;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS };
