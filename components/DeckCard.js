import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react';
import {gray, lightGray, lightPurple} from "../utils/colors";
import CardFlip from "react-native-card-flip";

export default class DeckCard extends Component {

    state = {
        cardView: "front",
    };

    flipCard(view) {
        this.card.flip();
        this.setState({cardView: view}, () => console.log(this.state.cardView))
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.card.question !== this.props.card.question && this.state.cardView !== "front") {
            this.flipCard("front")
        }
    }


    render() {
        const {card} = this.props;

        return (
            <View style={styles.container}>
                <CardFlip style={styles.cardFlipContainer} ref={card => (this.card = card)}>
                    <TouchableOpacity onPress={() => this.flipCard("back")}>
                        <Animated.View
                            style={styles.card}>
                            <View>
                                <Text style={{fontSize: 25, fontWeight: "bold", color: lightGray}}>
                                    {card.question}
                                </Text>
                                <Text style={{fontSize: 15, marginTop: 15, color: lightGray}}>
                                    Click to view answer
                                </Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.flipCard("front")}>
                        <Animated.View
                            style={styles.card}>
                            <View>
                                <Text style={{fontSize: 25, fontWeight: "bold", color: lightGray}}>
                                    {card.answer}
                                </Text>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </CardFlip>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "30%"
    },
    card: {
        backgroundColor: lightPurple,
        flexDirection: "row",
        borderRadius: 10,
        width: 380,
        padding: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center",
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowColor: gray,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    cardFlipContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginRight: "90%"
    },
});
