import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label, Card, CardItem } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ConRecordCard from '../components/ConRecordCard';
import DateTimeHelper from '../helper/DateTimeHelper';
import ConRecordService from '../services/ConRecordService';

export default function MonthlyScreen({ navigation }) {

    //const [SelectedDay, setSelectedDay] = useState(new Date())
    const [Records, setRecords] = useState([])
    const [MarkedDates, setMarkedDates] = useState({})
    const [CardDetails, setCardDetails] = useState([])
    const onSelectDay = (day, Records) => {
        // setSelectedDay(day)
        // console.log(`selected day = `, day)        
        var jsdate = new Date(day.timestamp)
        // console.log(Records)
        var _CardDetails = Records.filter(item => {
            var con_jsdate = new Date(item.con_datetime)
            return (DateTimeHelper.formatCalendarDate(jsdate) == DateTimeHelper.formatCalendarDate(con_jsdate)) ? true : false
        })
        // console.log('_CardDetails',_CardDetails);
        setCardDetails(_CardDetails)
    }

    const getRecordInit = () => {
        var tdy = new Date()
        getMonthlyRecord({
            day: tdy.getDate(),
            month: tdy.getMonth() + 1,
            year: tdy.getFullYear(),
            timestamp: tdy.getTime()
        })
    }

    useEffect(() => {
        getRecordInit()
        const unsubscribe = navigation.addListener('focus', () => {
            getRecordInit()
        });
        return () => {
            unsubscribe;
        }

    }, [navigation])

    const renderMarkedDate = (data) => {

        var markedDates = {}
        // console.log('renderMarkedDate', data)
        data.forEach(item => {

            var date = new Date(item.con_datetime)
            markedDates[DateTimeHelper.formatCalendarDate(date)] = { marked: true }
        });
        setMarkedDates(markedDates)
    }

    const getMonthlyRecord = async (Month) => {
        if (Month != null) {
            let data = DateTimeHelper.FormatMonthToStartEndDateSQL(Month)
            const result = await ConRecordService.GetRecordsInRange(data)
            if (result.success) {
                setRecords(result.data)
                onSelectDay(Month, result.data)
                renderMarkedDate(result.data)
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
    }

    return (
        <ScrollView>
            <Calendar markedDates={MarkedDates}
                onDayPress={(day) => onSelectDay(day, Records)}
                onMonthChange={(month) => getMonthlyRecord(month)} />
            {
                CardDetails.map((detail, index) => <ConRecordCard key={index} detail={detail} />)
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    TitleTxt: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center',
    },
});
