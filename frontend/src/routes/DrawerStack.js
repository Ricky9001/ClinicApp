import React from 'react'
import CreateInterview from '../screens/CreateInterview';
import DailyRecord from '../screens/DailyRecord';

import { createDrawerNavigator } from '@react-navigation/drawer';
import MonthlyScreen from '../screens/MonthlyScreen';

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="CreateRecord" component={CreateInterview} />
            <Drawer.Screen name="Monthly" component={MonthlyScreen} />
            
            <Drawer.Screen name="Daily" component={DailyRecord} />

        </Drawer.Navigator>
    )
}
