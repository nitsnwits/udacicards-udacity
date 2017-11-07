/**
 * This file provides helpers to update state in async storage.
 * 
 * Sample data for store:
 * 
 * 
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
 */

import { AsyncStorage } from 'react-native';
import { isEmpty } from 'lodash';

export function getDecksApi() {
  return AsyncStorage.getAllKeys()
    .then(titles => {
      return AsyncStorage.multiGet(titles)
        .then(titleInfo => {
          return titleInfo.map(title => {
            const deck = JSON.parse(title[1]);
            if (isEmpty(deck)) return;
            return {
              title: deck.title,
              cardCount: deck.questions.length
            };
          });
        });
    })
    .catch(err => console.error('Error getDecks: ', err));
}

export function getDeckApi(title) {
  return AsyncStorage.getItem(title)
    .then(titleInfo => JSON.parse(titleInfo))
    .catch(err => console.error('Error getDeck: ', err));
}

export function saveDeckTitleApi(title) {
  return AsyncStorage.setItem(title, JSON.stringify({ title, questions: []}))
    .catch(err => console.error('Error saveDeckTitle: ', err));
}

export function addCardToDeckApi(title, card) {
  return AsyncStorage.getItem(title)
    .then(titleInfo => {
      const updatedTitle = JSON.parse(titleInfo);
      updatedTitle.questions.push(card);
      return AsyncStorage.mergeItem(title, JSON.stringify({questions: updatedTitle.questions}));
    })
    .catch(err => console.error('Error addCardToDeck: ', err));
}
