import {AddCardToDeck, AddDeck, getAllDecks} from "../utils/api";

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const RESET_DECK_ID = "RESET_DECK_ID";

function getDecks (decks) {
    return {
        type: GET_DECKS,
        decks,
    }
}

export function handleGetDecks() {
    return dispatch => {
        return getAllDecks().then(decks => {
            dispatch(getDecks(decks));
        });
    };
}

function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function handleAddDeck(title) {
    return (dispatch) => {
        return AddDeck(title)
            .then((deck) => dispatch(addDeck(deck)))
    }
}

function addCard (card, deckId) {
    return {
        type: ADD_CARD,
        card,
        deckId
    }
}

export function handleAddCard(deckId, card) {
    return dispatch => {
        return AddCardToDeck(deckId, card).then(() => {
            dispatch(addCard(card,deckId));
        });
    };
}

export function resetDeckId() {
    return {
        type: RESET_DECK_ID
    };
}