import { combineReducers } from 'redux';
import decks from './decks';
import createdDeckId from './createdDeckId';

export default combineReducers({
    decks,
    createdDeckId
});