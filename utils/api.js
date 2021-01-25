import {AsyncStorage} from 'react-native'
export const DECKS_STORAGE_KEY = 'flashCards:Deck'
import { generateUID } from "./helpers";

function initialData() {
    return {
        "iuhmu0ic6g9klfo9": {
            id: "iuhmu0ic6g9klfo9",
            title: "React",
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
        "ebzt6q5vn7ms023n": {
            id:"ebzt6q5vn7ms023n",
            title: "JavaScript",
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
    };
}

export async function getAllDecks() {
    try {
        const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        if (results) {
            const data = JSON.parse(results);
            return data;
        } else {
            await AsyncStorage.setItem(
                 DECKS_STORAGE_KEY,
                JSON.stringify(initialData())
            );
            return initialData();
        }
    } catch (error) {
        await AsyncStorage.setItem(
             DECKS_STORAGE_KEY,
            JSON.stringify(initialData())
        );
        return initialData();
    }
}

export async function AddDeck(title) {
    const id = generateUID();
    const deck = {
        id: id,
        title: title,
        questions: []
    };

    await AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
            [id]: deck
        })
    );
    return deck;
}

export async function AddCardToDeck(deckId, card) {
    const results =  await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (results) {
        const data = JSON.parse(results);
        const deck = data[deckId];
        deck.questions = deck.questions.concat([card]);
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [deckId]: deck
            })
        );
        return card;
    }
}