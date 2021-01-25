import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react';
import {gray, lightGray, lightPurple} from "../utils/colors";

export default class DeckCard extends Component {

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

    }

    componentWillMount() {

        // Flipcard animation
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({value}) => {
            this.value = value;
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }

    render() {
        const {card} = this.props;
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate}
            ]
        };
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}
            ]
        };
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.flipCard()}>
                    <Animated.View
                        style={[styles.flipCard1, styles.card, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
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
                <TouchableOpacity onPress={() => this.flipCard()}>
                    <Animated.View
                        style={[styles.flipCard1, styles.flipCardBack1, styles.card, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <View>
                            <Text style={{fontSize: 25, fontWeight: "bold", color: lightGray}}>
                                {card.answer}
                            </Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: lightPurple,
        flexDirection: "row",
        borderRadius: 10,
        width: 380,
        // height: containerWidth,
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
    flipCard1: {
        backfaceVisibility: 'hidden',
    },
    flipCardBack1 : {
        position: "absolute",
        bottom: 0,
        left:-190
    }
});
