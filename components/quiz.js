import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react'
import {lightPurple, purple} from "../utils/colors";
import DeckCard from "./DeckCard";
import {FontAwesome, FontAwesome5} from '@expo/vector-icons';
import {connect} from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Quiz extends Component {
    state = {
        answeredQuestion: 0,
        correctQuestion: 0,
        inCorrectQuestions: 0,
        quizCompleted: false,
        cardIndex: 0
    };

    increaseCorrectQuestions = () => {
        this.setState({correctQuestion: this.state.correctQuestion + 1}, ()=>this.increaseAnsweredQuestions());
    };

    increaseIncorrectQuestions = () => {
        console.log("increaseIncorrectQuestions X", this.state.inCorrectQuestions)

        this.setState({inCorrectQuestions: this.state.inCorrectQuestions + 1}, ()=>this.increaseAnsweredQuestions());
    };

    increaseAnsweredQuestions = () => {
        this.setState({answeredQuestion: this.state.answeredQuestion + 1}, () => this.setState({quizCompleted: this.state.answeredQuestion === this.props.deck.questions.length}))
    };

    goToNextQuestion = () => {
        this.setState({cardIndex: this.state.cardIndex + 1})
    };

    resetQuiz = ()=>{
        this.setState({
            answeredQuestion: 0,
            correctQuestion: 0,
            inCorrectQuestions: 0,
            quizCompleted: false,
            cardIndex: 0}
            )
    }
    renderQuiz = () => {
        const {questions} = this.props.deck;
        const {cardIndex} = this.state;
        if (questions.length)
            return (
                <View style={styles.quiz}>
                    <DeckCard card={questions[cardIndex]}/>
                    <Text style={styles.counter}>{`Question ${cardIndex + 1} of ${questions.length}`}</Text>
                    {this.state.answeredQuestion === cardIndex ?
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button}  onPress={() => this.increaseCorrectQuestions()}>
                                <FontAwesome5 name="check" size={24} color={purple}/>
                                <Text style={styles.text}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.increaseIncorrectQuestions()}>
                                <FontAwesome name="close" size={24} color={purple}/>
                                <Text style={styles.text}>Incorrect</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => this.goToNextQuestion()}>
                                <Text style={styles.text}>Next..</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            );

        return (
            <View style={styles.quiz}>
                <Text style={styles.text}>Sorry you didn't add any questions yet!</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.text}>Back.</Text>
                </TouchableOpacity>
            </View>
        )
    };

    quizResult = () => {
        let percentage = (this.state.correctQuestion/this.state.answeredQuestion) * 100
        return (
            <View style={styles.quiz}>
                <MaterialCommunityIcons name="party-popper" size={150} color={purple} />
                <Text style={styles.resultText}>You are Done!</Text>
                <Text style={styles.resultText}>You have answered {percentage.toFixed(1)}% correctly!</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}  onPress={() => this.resetQuiz()}>
                        <MaterialCommunityIcons name="restart" size={24} color={purple} />
                        <Text style={styles.text}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.goBack()}>
                        <MaterialCommunityIcons name="keyboard-backspace" size={24} color={purple} />
                        <Text style={styles.text}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return this.state.quizCompleted ? this.quizResult() : this.renderQuiz()
    }
}

function mapStateToProps({decks}, {route, navigation}) {
    const {deckId} = route.params
    return {
        deck: decks[deckId],
        navigation
    }
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    quiz: {
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 380,
        padding: 15,
        borderWidth: 1,
        borderColor: lightPurple,
        borderRadius: 10,
        marginTop: 10
    },
    text: {
        color: purple,
        fontSize: 20,
        marginLeft: 10
    },
    resultText:{
        color: purple,
        fontSize: 20,
    },
    counter: {
        color: purple,
        fontSize: 15,
        marginTop:10
    }

});