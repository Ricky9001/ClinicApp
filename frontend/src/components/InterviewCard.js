import React, { useState } from 'react'
import { Container, Form, Header, Input, Title, Item, Button, Label, Card, CardItem, CheckBox, Body } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimeHelper from '../helper/DateTimeHelper'
export default function InterviewCard(props) {
    const [showDetail, setshowDetail] = useState(false)
    const intdate = new Date(props.detail.interview_date)
    return (
        <Card style={styles.CardWrapper}>
            <CardItem button onPress={() => setshowDetail(!showDetail)}>
                <Text> Interview on {DateTimeHelper.formatDateTime(intdate, 'date')} {DateTimeHelper.formatDateTime(intdate, 'time')}</Text>
            </CardItem>
            {
                showDetail &&
                <CardItem cardBody style={styles.cardBody} >
                    <Body >
                        <Text>Company: {props.detail.company}</Text>
                        <Text>Interviewer: {props.detail.interviewer}</Text>
                        <Text>Interviewee: {props.detail.interviewee}</Text>
                        <Text>Job Title: {props.detail.jobtitle}</Text>
                        <Text>Expected Salary: {props.detail.salary}</Text>
                        <Text>Interview Date: {DateTimeHelper.formatDateTime(intdate, 'date')}</Text>
                        <Text>Interview Time: {DateTimeHelper.formatDateTime(intdate, 'time')}</Text>
                    </Body>
                </CardItem>
            }

        </Card>
    )
}


const styles = StyleSheet.create({
    lineStyle: {
        borderTopWidth: 0.5,
        borderColor: 'grey',
        margin: 10,
    },
    cardBody: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    CardWrapper: {
        paddingBottom: 5,
    }
});