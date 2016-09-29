import util from './util'

function game(state = [], action) {
  state = JSON.parse(JSON.stringify(state));
  if(action.message)
    state.log = [].concat(state.log, action.message)

  switch (action.type) {
    case "USER_LOGIN":
      state.logged = true;
      return state;

    case "USER_LOGOUT":
      state.logged = false;
      return state;

    case "USER_AUTH":
      state.logged = action.isAuth;
      return state;

    case "TOGGLE_LOGIN":
      state.login = action.isLogin;
      return state;

    case "CHANGE_ENEMY":
      state.enemyId = action.id;
      return state;

    default:
      state.enemyTurn = !state.enemyTurn;
      return state;
  }
}

export default game;
