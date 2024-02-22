const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const possibleMoves = [
  { dx: 1, dy: 2 },
  { dx: 2, dy: 1 },
  { dx: -1, dy: 2 },
  { dx: -2, dy: 1 },
  { dx: 2, dy: -1 },
  { dx: 1, dy: -2 },
  { dx: -1, dy: -2 },
  { dx: -2, dy: -1 },
];

function knightMoves(startPosition, endPosition) {
  if (!isValid(startPosition) || !isValid(endPosition)) {
    return "Invalid board position(s)";
  }

  let moveQueue = [];

  //Stores visited board spaces
  visited = Array(8)
    .fill(false)
    .map(() => Array(8).fill(false));

  //Stores original position relation to current position
  movesGraph = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  //Marks the startPosition as visited, add to moveQueue
  visited[startPosition[0]][startPosition[1]] = true;
  moveQueue.push(startPosition);

  while (moveQueue.length) {
    //console.log(moveQueue);

    let currentPostion = moveQueue.shift();
    //console.log(`current pos = ${currentPostion}`);

    //True if we are at the destination
    if (areArraysEqual(currentPostion, endPosition)) {
      writePath(startPosition, endPosition, movesGraph);
      return;
    }

    //Iterate through possible moves from currentPosition
    for (move of possibleMoves) {
      possibleX = currentPostion[0] + move.dx;
      possibleY = currentPostion[1] + move.dy;

      //Check if legal and not visited
      if (isValid([possibleX, possibleY]) && !visited[possibleX][possibleY]) {
        //Add to visited and moveQueue if valid
        visited[possibleX][possibleY] = true;
        movesGraph[possibleX][possibleY] = currentPostion;
        moveQueue.push([possibleX, possibleY]);
      }
    }
  }
}

//Creates the path from startPosition -> endPosition
function writePath(startPosition, endPosition, movesGraph) {
  let resultPath = [endPosition];
  let currentEdge = endPosition;

  do {
    currentEdge = movesGraph[currentEdge[0]][currentEdge[1]];
    resultPath.push(currentEdge);
  } while (!areArraysEqual(currentEdge, startPosition));

  resultPath.reverse();
  console.log(`You made it in ${resultPath.length - 1} moves! Here's your path:`);
  
  for (let position of resultPath) {
    console.log(position);
  }
}

//Only works for length 2 arrays
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== 2 || arr2.length !== 2) {
    return false;
  }
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

//Checks if position is on the chess board
function isValid(position) {
  return (
    position[0] >= 0 &&
    position[0] < BOARD_WIDTH &&
    position[1] >= 0 &&
    position[1] < BOARD_HEIGHT
  );
}

knightMoves([0, 0], [3, 3]);
knightMoves([0,0],[7,7]);
