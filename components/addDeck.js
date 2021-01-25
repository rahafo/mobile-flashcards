import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react'
import {black, gray, lightGray, lightPurple, white} from "../utils/colors";
import {handleAddDeck} from "../actions";
import {connect} from 'react-redux'

class AddDeck extends Component {
    state = {
        title: ""
    };

    submit = () => {
        this.props.dispatch(handleAddDeck(this.state.title));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.createdDeckId !== this.props.createdDeckId) {
            let title = this.state.title;
            this.setState({title: ""}, () => this.props.navigation.navigate(
                'DeckDetail',
                {id: this.props.createdDeckId, title: title}
            ));
        }
    }


    render() {
        let disabled = this.state.title === "";
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Add Title Deck
                </Text>
                <TextInput style={styles.input} value={this.state.title}
                           onChangeText={text => this.setState({title: text})}/>
                <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={() => this.submit()} disabled={disabled}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }


}

function mapStateToProps({createdDeckId}) {
    return {
        createdDeckId: createdDeckId.createdDeckId
    };
}


export default connect(mapStateToProps)(AddDeck);
const styles = StyleSheet.create({
    container: {
        backgroundColor: lightGray,
        borderRadius: 10,
        width: 380,
        height: 300,
        padding: 40,
        marginTop: 10,
        alignSelf: "center",
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
    text: {
        color: black,
        fontSize: 30,
    },
    input: {
        alignItems: "center",
        width: 300,
        padding: 15,
        borderWidth: 1,
        borderColor: lightPurple,
        borderRadius: 10,
        marginTop: 25
    },
    button: {
        alignItems: "center",
        width: 300,
        padding: 15,
        backgroundColor: lightPurple,
        borderRadius: 10,
        marginTop: 35
    },
    disabled:{
        backgroundColor: gray,
    },
    buttonText: {
        color: white,
        fontSize: 20
    }
});
