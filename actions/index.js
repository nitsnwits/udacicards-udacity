import {
  GET_DECKS,
  GET_DECK,
  ADD_CARD_TO_DECK,
  SAVE_DECK_TITLE
} from './types';
import {
  getDecksApi,
  getDeckApi,
  saveDeckTitleApi,
  addCardToDeckApi
} from '../utils/api';

export const handleGetDecks = response => {
  return {
    type: GET_DECKS,
    response
  };
}

export const getDecks = () => {
  return dispatch => {
    return getDecksApi()
      .then(decks => dispatch(handleGetDecks(decks)))
      .catch(err => console.error('Error action getDecks: ', err));
  }
}

export const handleGetDeck = response => {
  return {
    type: GET_DECK,
    response
  };
}

export const getDeck = title => {
  return dispatch => {
    return getDeckApi(title)
      .then(deck => dispatch(handleGetDeck(deck)))
      .catch(err => console.error('Error action getDeck: ', err));
  }
}

export const handleSaveDeckTitle = response => {
  return {
    type: SAVE_DECK_TITLE,
    response
  };
}

export const saveDeckTitle = title => {
  return dispatch => {
    return saveDeckTitleApi(title)
      .then(deck => dispatch(handleSaveDeckTitle(deck)))
      .catch(err => console.error('Error action saveDeckTitle: ', err));
  }
}

export const handleAddCardToDeck = response => {
  return {
    type: ADD_CARD_TO_DECK,
    response
  };
}

export const addCardToDeck = (title, card) => {
  return dispatch => {
    return addCardToDeckApi(title, card)
      .then(() => dispatch(handleAddCardToDeck({title, card})))
      .catch(err => console.error('Error action addCardToDeck: ', err));
  }
}
