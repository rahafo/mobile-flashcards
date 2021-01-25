import {FlatList, StyleSheet, View, TouchableOpacity,Text} from 'react-native'
import React, {Component} from 'react'
import {DeckCardInfo} from "./DeckCardInfo";
import { connect } from 'react-redux'
import {handleGetDecks} from "../actions";

class DeckList extends Component {
    componentDidMount () {
        this.props.dispatch(handleGetDecks())
    }

    renderItem = ({item}) => {
        return <TouchableOpacity
            key={item.id}
            onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                {id: item.id, title: item.title}
            )}
        >
            <DeckCardInfo name={item.title} numOfCard={item.questions.length}/>
        </TouchableOpacity>
    };

    render() {
        if(!this.props.decks){
            return (
                <View style={styles.list}>
                    <Text>There is no decks yet</Text>
                </View>
            )
        }
        return (
            <View style={styles.list}>
                <FlatList style={{flex:1}} data={this.props.decks} renderItem={item=>this.renderItem(item)}/>
            </View>
        )
    }

}
function mapStateToProps ({decks}) {
    return {
        decks: Object.keys(decks).map((key)=> decks[key])
    }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
    list: {
        padding: 10,
        flex: 1,
        marginTop: 30,
        alignItems: "center",
    },
});