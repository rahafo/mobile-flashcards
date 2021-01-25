import { ADD_DECK,RESET_DECK_ID } from '../actions';


export default function createdDeckId (state = {}, action) {
    switch(action.type){
        case ADD_DECK :
            const { deck } = action;
            return {
                ...state,
                createdDeckId: deck.id
            }
        case RESET_DECK_ID:
            return {
                ...state,
                createdDeckId: null,
            }
        default :
            return state;
    }
}