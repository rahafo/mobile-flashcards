import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react'
import {Text} from "react-native";
import {black, gray, lightGray, lightPurple, white} from "../utils/colors";
import { TextInput } from 'react-native';
import {connect} from "react-redux";
import {handleAddCard, handleAddDeck} from "../actions";



class AddCard extends Component {
    state = {
        question:"",
        answer:""
    };
    submit = () => {
        this.props.dispatch(handleAddCard(this.props.deckId,this.state));
        this.props.navigation.goBack();
    };

    render() {
        let disabled = this.state.question === "" || this.state.answer === ""

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Question:
                </Text>
                <TextInput style={styles.input} value={this.state.question}
                           onChangeText={text => this.setState({question: text})} />
                <Text style={styles.text}>
                    Answer:
                </Text>
                <TextInput style={styles.input} value={this.state.answer}
                           onChangeText={text => this.setState({answer: text})} />
                <TouchableOpacity style={[styles.button,disabled && styles.disabled]} onPress={() => this.submit()} disabled={disabled}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps ({decks}, { route, navigation }) {
    const { deckId } = route.params
    return {
        deckId,
        navigation
    }
}

export default connect(mapStateToProps)(AddCard);



const styles = StyleSheet.create({
    container: {
        backgroundColor: lightGray,
        borderRadius: 10,
        width: 380,
        height: 350,
        padding: 40,
        marginTop: 10,
        alignSelf:"center",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowColor: gray,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    text:{
        color: black,
        fontSize: 20,
        marginTop:10.
    },
    input:{
        alignItems:"center",
        width: 300,
        padding: 15,
        borderWidth:1,
        borderColor: lightPurple,
        borderRadius: 10,
        marginTop: 10
    },
    button:{
        alignItems:"center",
        width: 300,
        padding: 15,
        backgroundColor: lightPurple,
        borderRadius: 10,
        marginTop: 40
    },
    disabled:{
        backgroundColor: gray,
    },
    buttonText:{
        color: white,
        fontSize: 20
    }
});
