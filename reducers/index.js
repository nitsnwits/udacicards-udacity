import * as ACTIONS from '../actions/types';

const initialState = {
  decks: null,
  deck: null
};

export default function(state = {}, action) {

  switch(action.type) {

    case ACTIONS.GET_DECKS:
      return {
        decks: action.response,
        deck: state.deck
      };
    
    case ACTIONS.GET_DECK:
      return {
        deck: action.response,
        decks: state.decks
      };

    default:
      return state;
  }

}
