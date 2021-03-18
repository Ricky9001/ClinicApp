import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label, CheckBox, ListItem, Body, Left, Right } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimeHelper from "../helper/DateTimeHelper";
import ConRecordService from "../services/ConRecordService";

export default function CreateConRecord({ navigation }) {
    const [doctor, setdoctor] = useState('');
    const [patient, setpatient] = useState('')
    const [diagnosis, setdiagnosis] = useState('')
    const [medication, setmedication] = useState('')
    const [fee, setfee] = useState('')
    const [date, setdate] = useState(null)
    const [time, settime] = useState(null)
    const [displayDate, setdisplayDate] = useState('')
    const [displayTime, setdisplayTime] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [followup, setfollowup] = useState(false)
    const [warning, setwarning] = useState(null);

    const SubmitAction = async () => {
        if (validateInput()) {
            let con_datetime = DateTimeHelper.ParseDateTimeToSQL(date, time);
            let follow_up = followup ? 'Y' : 'N'
            const data = { doctor, patient, diagnosis, medication, fee, con_datetime, follow_up }

            const result = await ConRecordService.Create(data);

            if (result.success) {
                alert('Record is created!')
                resetState();
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
    const resetState = () => {
        setdoctor('')
        setpatient('')
        setdiagnosis('')
        setmedication('')
        setfee('')
        setdate(null)
        settime(null)
        setdisplayDate('')
        setdisplayTime('')
        setfollowup(false)
        setwarning(null)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        try {
            setdate(date);
            setdisplayDate(DateTimeHelper.formatDateTime(date, 'date'))
            hideDatePicker();
        }
        catch (err) {
            console.log(err)
        }
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        //console.log("A Time has been picked: ", time);
        try {
            settime(time);
            setdisplayTime(DateTimeHelper.formatDateTime(time, 'time'))
            hideTimePicker();
        }
        catch (err) {
            console.log(err)
        }
    };

    const validateInput = () => {
        if (!doctor) {
            setwarning('Doctor is empty!')
        }
        else if (!patient) {
            setwarning('Patient is empty!')
        }
        else if (!medication) {
            setwarning('Medication is empty!')
        }
        else if (!fee) {
            setwarning('Consultation Fee is empty!')
        }
        else if (!/^\d+$/.test(fee)) {
            setwarning('Consultation Fee should be contain only number!')
        }
        else if (fee >= 2147483647)
        {
            setwarning('The amount of fee is too big!')
        }
        else if (!date) {
            setwarning('Consultation Date is empty!')
        }
        else if (!time) {
            setwarning('Consultation Time is empty!')
        }
        else {
            setwarning(null)
            return true
        }
        return false
    }

    return (
        <ScrollView>
            <Text style={styles.TitleTxt}>New Consultation Record</Text>
            <Form style={styles.RecordForm}>
                {warning && <Text style={styles.WarningTxt}>{warning}</Text>}
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Doctor Name</Label>
                    <Left>
                        <Input placeholder="Please type..." value={doctor} onChangeText={(txt) => setdoctor(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Patient Name</Label>
                    <Left>
                        <Input placeholder="Please type..." value={patient} onChangeText={(txt) => setpatient(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Diagnosis</Label>
                    <Left>
                        <Input placeholder="Please type..." value={diagnosis} onChangeText={(txt) => setdiagnosis(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Medication</Label>
                    <Left>
                        <Input placeholder="Please type..." value={medication} onChangeText={(txt) => setmedication(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Consultation Fee</Label>
                    <Left>
                        <Input placeholder="Please type..." value={fee} onChangeText={(txt) => setfee(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >

                    <Label style={styles.ItemLabel}>Consultation Date</Label>
                    <Left>
                        <Input placeholder="" value={displayDate} disabled={true} />
                    </Left>
                    <Right style={styles.ItemRight}>
                        <TouchableOpacity style={styles.ChooseBtn} onPress={() => showDatePicker()}>
                            <Text style={styles.ChooseTxt}>Choose</Text>
                        </TouchableOpacity>
                    </Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Consultation Time</Label>
                    <Left>
                        <Input placeholder="" value={displayTime} disabled={true} />
                    </Left>
                    <Right style={styles.ItemRight}>
                        <TouchableOpacity style={styles.ChooseBtn} onPress={() => showTimePicker()}>
                            <Text style={styles.ChooseTxt}>Choose</Text>
                        </TouchableOpacity>
                    </Right>
                </Item>
                <Item style={styles.RecordFormItem_CB} >
                    <Label style={styles.ItemLabel}>Follow Up</Label>
                    <Left>
                        <CheckBox checked={followup} onPress={() => setfollowup(!followup)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Button block style={styles.SubmitBtn}
                        onPress={SubmitAction}>
                        <Text style={styles.Submit_txt}>Submit</Text>
                    </Button>
                </Item>
            </Form>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    TitleTxt: {
        paddingTop: 20,
        fontSize: 20,
        textAlign: 'center',
    },
    RecordForm: {
        paddingHorizontal: 30,
    },
    RecordFormItem: {
        paddingVertical: 5
    },
    RecordFormItem_CB: {
        paddingVertical: 5,
        height: 50,
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    ItemTxt: {
        fontSize: 15,
    },
    SubmitBtn: {
        width: '100%',
        backgroundColor: '#19e87d',
    },
    Submit_txt: {
        color: '#fff',
        fontWeight: 'bold'
    },
    WarningTxt: {
        paddingHorizontal: 20,
        color: '#ff0000',
    },
    ChooseBtn: {
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        // paddingHorizontal: 30,
        flexDirection: 'row'
    },
    ChooseTxt: {
        textAlign: 'right',
        color: 'blue'
    },
    ItemLabel: {
        flex: 1.2,
        fontSize: 15,
    },
    ItemRight: {
        flex: 0.5,
    }
})