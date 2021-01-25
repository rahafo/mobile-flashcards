import * as React from "react";
import {MainNavigator} from "./components/MainNavigator";
import {NavigationContainer} from "@react-navigation/native";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import { setLocalNotification } from './utils/helpers'


export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer,middleware)}>
            <NavigationContainer style={{flex: 1}}>
                <MainNavigator  style={{flex: 1}}/>
            </NavigationContainer>
            </Provider>
        );
    }
}
