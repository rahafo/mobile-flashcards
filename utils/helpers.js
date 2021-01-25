import React from 'react'
import {AsyncStorage } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = 'flashCards:notifications'

export function generateUID() {
    return (
        Math.random()
            .toString(36)
            .substring(2, 10) +
        Math.random()
            .toString(36)
            .substring(2, 10)
    );
}

export function getDailyReminderValue () {
    return {
        today: "👋 Don't forget to log your data today!"
    }
}


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Study Remainder!',
        body: "Don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(10);
                            tomorrow.setMinutes(30);

                            Notifications.scheduleLocalNotificationAsync(createNotification(),{
                                time: tomorrow,
                                repeat:"day"
                            });
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}