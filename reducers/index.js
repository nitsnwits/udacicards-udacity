import * as ACTIONS from '../actions/types';

export default function(state = {}, action) {

  switch(action.type) {

    case ACTIONS.GET_DECKS:
      return action.response;

    default:
      return state;
  }

}
