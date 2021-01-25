import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {gray, lightGray, lightPink, lightPurple, white} from "../utils/colors";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const DeckCardInfo = ({name, numOfCard}) => {
    return (
        <View style={styles.card}>
            <MaterialCommunityIcons name="cards" size={40} color={white} style={{marginRight: 25}}/>
            <View>
                <Text style={{fontSize: 25, fontWeight:"bold",  color: lightGray}}>
                    {name}
                </Text>
                <Text style={{fontSize: 16, color: lightGray}}>
                    {`${numOfCard} Cards`}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: lightPurple,
        flexDirection: "row",
        borderRadius: 10,
        width: 380,
        padding: 40,
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: "center",
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowColor: gray,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
});
