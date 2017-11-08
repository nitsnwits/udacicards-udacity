import * as ACTIONS from '../actions/types';
import { isEmpty } from 'lodash';

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
    
    case ACTIONS.SAVE_DECK_TITLE:
      return {
        deck: state.deck,
        decks: isEmpty(action.response) ? state.decks : state.decks.push(action.response)
      };
    
    case ACTIONS.ADD_CARD_TO_DECK:
      return {
        deck: state.deck,
        decks: state.decks
      };

    default:
      return state;
  }

}
