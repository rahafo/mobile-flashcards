import {ADD_CARD, ADD_DECK, GET_DECKS} from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS :
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK :
            return {
                ...state,
                [action.deck.id]: action.deck
            };
        case ADD_CARD :
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat([action.card])
                }
            };
        default :
            return state
    }
}

export default decks