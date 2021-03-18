import React, { useState } from 'react'
import { Container, Form, Header, Input, Title, Item, Button, Label, Card, CardItem, CheckBox, Body } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimeHelper from '../helper/DateTimeHelper'
export default function ConRecordCard(props) {
    const [showDetail, setshowDetail] = useState(false)
    const jsdate = new Date(props.detail.con_datetime)
    return (
        <Card style={styles.CardWrapper}>
            <CardItem button onPress={() => setshowDetail(!showDetail)}>
                <Text> Consultation on {DateTimeHelper.formatDateTime(jsdate, 'date')} {DateTimeHelper.formatDateTime(jsdate, 'time')}</Text>
            </CardItem>
            {
                showDetail &&
                <CardItem cardBody style={styles.cardBody} >
                    <Body >
                        <Text>Doctor: {props.detail.doctor}</Text>
                        <Text>Patient: {props.detail.patient}</Text>
                        <Text>Diagnosis: {props.detail.diagnosis}</Text>
                        <Text>Medication: {props.detail.medication}</Text>
                        <Text>Consultation Fee: {props.detail.fee}</Text>
                        <Text>Consultation Date: {DateTimeHelper.formatDateTime(jsdate, 'date')}</Text>
                        <Text>Consultation Time: {DateTimeHelper.formatDateTime(jsdate, 'time')}</Text>
                        <Text>Follow Up: {(props.detail.follow_up == 'Y') ? "Yes" : "No"}</Text>
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