import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button } from 'native-base';

import DateTimeHelper from '../helper/DateTimeHelper';
import InterviewCard from '../components/InterviewCard';
import InterviewService from '../services/InterviewService';
import { ScrollView } from 'react-native-gesture-handler';

export default function DailyRecord({ navigation }) {
    const [currDate, setcurrDate] = useState(new Date())
    const [Records, setRecords] = useState([])

    useEffect(() => {
        getRangeRecord()
        const unsubscribe = navigation.addListener('focus', () => {
            getRangeRecord()
        });
        return () => {
            unsubscribe;
        }
    }, [currDate, navigation])

    const btnAction = (action) => {
        var tmpDate = new Date(currDate)
        if (action == 'A') {
            tmpDate.setDate(tmpDate.getDate() + 1)
        }
        else {
            tmpDate.setDate(tmpDate.getDate() - 1)
        }
        setcurrDate(tmpDate)
    }

    const getRangeRecord = async () => {
        let data = {}
        let _startdate, _enddate;
        _startdate = DateTimeHelper.setStartEndTime(currDate, 'start')
        _enddate = DateTimeHelper.setStartEndTime(currDate, 'end')

        data.startdatesql = DateTimeHelper.ParseDateTimeToSQL(_startdate, _startdate)
        data.enddatesql = DateTimeHelper.ParseDateTimeToSQL(_enddate, _enddate)
        // console.log(data)
        const result = await InterviewService.GetRecordsInRange(data)

        if (result.success) {
            // console.log(result)
            setRecords(result.data)
        }
        else if (result.redirect) {
            alert('Token expired! Please login again!')
            navigation.navigate('Login')
        }
        else {
            alert(result.message);
            return
        }
    }
    return (
        <View>
            
                <Item style={{ justifyContent: 'space-evenly' }}>
                    <Button transparent onPress={() => btnAction('R')}><Text>{"<"}</Text></Button>
                    <Text> {DateTimeHelper.formatDateTime(currDate, 'date')}</Text>
                    <Button transparent onPress={() => btnAction('A')}><Text>{">"}</Text></Button>
                </Item>
                <ScrollView style={styles.ScrollContainer}>
                {
                    Records.filter(item => {
                        var interviewdate = new Date(item.interview_date)
                        return (DateTimeHelper.formatCalendarDate(interviewdate) == DateTimeHelper.formatCalendarDate(currDate)) ? true : false
                    }).map((detail, index) => <InterviewCard key={index} detail={detail} />)
                }
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ScrollContainer: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        maxHeight: '95%',
    }
});
