import {purple, white} from "../utils/colors";
import * as React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeckList from "./DeckList";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import AddDeck from "./addDeck";
import {Platform} from 'react-native'

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    if (route.name === 'Decks') {
                        return <MaterialCommunityIcons name="cards" size={size} color={color}/>
                    } else if (route.name === 'AddDeck') {
                        return <MaterialIcons name="add-box" size={size} color={color}/>
                    }
                },
            })}
                           tabBarOptions={{
                               activeTintColor: Platform.OS === 'ios' ? purple : white,
                               style: {
                                   height: "8%",
                                   backgroundColor: Platform.OS === 'ios' ? white : purple,
                               }
                           }}>
                <Tab.Screen name="Decks" component={DeckList}/>
                <Tab.Screen name="AddDeck" component={AddDeck}/>
            </Tab.Navigator>
    );
};