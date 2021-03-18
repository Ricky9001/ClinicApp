import React from 'react'
import CreateConRecord from '../screens/CreateConRecord';
import DailyRecord from '../screens/DailyRecord';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MonthlyScreen from '../screens/MonthlyScreen';
import WeeklyScreen from '../screens/WeeklyScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="CreateRecord" component={CreateConRecord} />
            <Drawer.Screen name="Monthly" component={MonthlyScreen} />
            <Drawer.Screen name="Weekly" component={WeeklyScreen} />
            <Drawer.Screen name="Daily" component={DailyRecord} />

        </Drawer.Navigator>
    )
}
