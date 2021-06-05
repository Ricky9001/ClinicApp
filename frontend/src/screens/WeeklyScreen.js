import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label, Body } from 'native-base';
import DateTimeHelper from '../helper/DateTimeHelper'
import InterviewCard from '../components/InterviewCard';
import InterviewService from '../services/InterviewService';

const fisrtDateRange = DateTimeHelper.FindWeekStartEndDate(new Date())

export default function WeeklyScreen({navigation}) {
    const [startDate, setstartDate] = useState(fisrtDateRange.weekstart)
    const [endDate, setendDate] = useState(fisrtDateRange.weekend)
    const [range, setrange] = useState([])
    const [Records, setRecords] = useState([])
    useEffect(() => {
        var rangeArr = []
        for (var i = 0; i < 7; i++) {
            var tmpDate = new Date(startDate)
            tmpDate.setDate(tmpDate.getDate() + i);
            rangeArr.push(tmpDate);
        }
        setrange(rangeArr);
        getRangeRecord()
    }, [startDate])

    useEffect(()=> {
        const unsubscribe = navigation.addListener('focus', () => {
            getRangeRecord()
        });
        return () => {
            unsubscribe;
        }
    }, [navigation])

    const btnAction = (action) => {
        var tmpsDate = new Date(startDate)
        var tmpeDate = new Date(endDate)
        if (action == 'A') {
            tmpsDate.setDate(tmpsDate.getDate() + 7)
            tmpeDate.setDate(tmpeDate.getDate() + 7)
        }
        else {
            tmpsDate.setDate(tmpsDate.getDate() - 7)
            tmpeDate.setDate(tmpeDate.getDate() - 7)
        }
        setendDate(tmpeDate)
        setstartDate(tmpsDate)
    }
    const getRangeRecord = async () => {
        let data = {}
        let _startdate, _enddate;
        _startdate = DateTimeHelper.setStartEndTime(startDate, 'start')
        _enddate = DateTimeHelper.setStartEndTime(endDate, 'end')
        data.startdatesql = DateTimeHelper.ParseDateTimeToSQL(_startdate, _startdate)
        data.enddatesql = DateTimeHelper.ParseDateTimeToSQL(_enddate, _enddate)

        const result = await InterviewService.GetRecordsInRange(data)

        if (result.success) {
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
        <View >
            <Item style={{ justifyContent: 'space-evenly' }}>
                <Button transparent onPress={() => btnAction('R')}><Text>{"<"}</Text></Button>
                <Text> {DateTimeHelper.formatDateTime(startDate, 'date')} - {DateTimeHelper.formatDateTime(endDate, 'date')}</Text>
                <Button transparent onPress={() => btnAction('A')}><Text>{">"}</Text></Button>
            </Item>
            <ScrollView style={styles.ScrollContainer} >
                {/* <Container style={{ paddingHorizontal: 15 }}> */}
                    {
                        range.map(date =>
                            <Item key={date.getDay()} style={{ minHeight: 50 }}>
                                <Text style={{ flex: 1 }}> {DateTimeHelper.formatDateTime(date, 'date')}</Text>
                                <Body style={{ flex: 2 }}>
                                    {Records.filter(item => {
                                        var interviewdate = new Date(item.interview_date)
                                        return (DateTimeHelper.formatCalendarDate(interviewdate) == DateTimeHelper.formatCalendarDate(date)) ? true : false
                                    }).map((detail, index) => <InterviewCard key={index} detail={detail} />)}
                                </Body>
                            </Item>
                        )
                    }
                {/* </Container> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    TitleTxt: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center',
    },
    ScrollContainer: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        maxHeight: '95%',
    }
});