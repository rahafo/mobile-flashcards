import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react'
import {DeckCardInfo} from "./DeckCardInfo";
import {lightPurple, purple} from "../utils/colors";
import { connect } from "react-redux";

class DeckDetails extends Component {

    componentWillReceiveProps(nextProps) {
        if (!nextProps.deck) {
            this.props.navigation.goBack();
        }
    }

    render() {
        const {deck,navigation} = this.props;
        console.log("deck props", deck)
        if(deck)
        return (
            <View style={styles.details}>
                <DeckCardInfo name={deck.title} numOfCard={deck.questions.length}/>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(
                        'AddCard',
                        {deckId: deck.id}
                    )}>
                        <Text style={styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(
                        'Quiz',
                        {deckId: deck.id}
                    )}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

        return null
    }
}

function mapStateToProps ({decks}, { route, navigation }) {
    const { id } = route.params
    console.log("id",id)
    console.log("decks",decks)
    return {
        deck: decks[id],
        navigation
    }
}


export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({
    details: {
        padding: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonsContainer: {
        marginTop: 30,
        justifyContent: "space-between",
        height: 100
    },
    button: {
        alignItems: "center",
        width: 380,
        padding: 15,
        borderWidth: 1,
        borderColor: lightPurple,
        borderRadius: 10,
        marginTop: 10
    },
    buttonText: {
        color: purple,
        fontSize: 20
    }

});