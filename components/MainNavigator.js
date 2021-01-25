import {purple, white} from "../utils/colors";
import {Tabs} from "./Tabs";
import DeckDetails from "./deckDetails";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddCard from "./addCard";
import Quiz from "./quiz";

const Stack = createStackNavigator();

export const MainNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="DeckDetail" component={DeckDetails} options={({ route }) => ({
                    title: route.params.title,
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple,
                    }})} />
                    <Stack.Screen name="AddCard" component={AddCard} options={{
                    title: 'Add Card',
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple,
                    }}} />
                    <Stack.Screen name="Quiz" component={Quiz} options={{
                    title: 'Quiz',
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple,
                    }}} />
            </Stack.Navigator>
    );
};