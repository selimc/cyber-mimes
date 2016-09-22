import util from './util'

function startMap(state = [], action) {
  state = JSON.parse(JSON.stringify(state));
  state.prevlocationY = state.locationY;
  state.prevlocationX = state.locationX;
  switch (action.type) {
    case "GO_SOUTH":
      state.locationY -= 1;
      return state;
    case "GO_NORTH":
      state.locationY += 1;
      return state;
    case "GO_EAST":
      state.locationX += 1;
      return state;
    case "GO_WEST":
      state.locationX -= 1;
      return state;
    default:
      return state;
  }
}

export default startMap;
