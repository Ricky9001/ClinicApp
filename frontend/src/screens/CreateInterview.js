import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Container, Form, Header, Input, Title, Item, Button, Label, CheckBox, ListItem, Body, Left, Right } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimeHelper from "../helper/DateTimeHelper";
import InterviewService from "../services/InterviewService";

export default function CreateInterview({ navigation }) {
    const [company, setcompany] = useState('');
    const [interviewer, setinterviewer] = useState('')
    const [interviewee, setinterviewee] = useState('')
    const [jobtitle, setjobtitle] = useState('')
    const [salary, setsalary] = useState('')
    const [date, setdate] = useState(null)
    const [time, settime] = useState(null)
    const [displayDate, setdisplayDate] = useState('')
    const [displayTime, setdisplayTime] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [warning, setwarning] = useState(null);

    const SubmitAction = async () => {
        if (validateInput()) {
            let interview_date = DateTimeHelper.ParseDateTimeToSQL(date, time);
            const data = { company, interviewer, interviewee, jobtitle, salary, interview_date }

            const result = await InterviewService.Create(data);

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
        setcompany('')
        setinterviewer('')
        setinterviewee('')
        setjobtitle('')
        setsalary('')
        setdate(null)
        settime(null)
        setdisplayDate('')
        setdisplayTime('')
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
        if (!company) {
            setwarning('Company is empty!')
        }
        else if (!interviewer) {
            setwarning('Interviewer is empty!')
        }
        else if (!interviewee) {
            setwarning('Interviewee is empty!')
        }
        else if (!jobtitle) {
            setwarning('Job Title is empty!')
        }
        else if (!salary) {
            setwarning('Salary is empty!')
        }
        else if (!/^\d+$/.test(salary)) {
            setwarning('Salary should be contain only number!')
        }
        else if (salary >= 2147483647)
        {
            setwarning('The amount of expected salary is too big!')
        }
        else if (!date) {
            setwarning('Interview Date is empty!')
        }
        else if (!time) {
            setwarning('Interview Time is empty!')
        }
        else {
            setwarning(null)
            return true
        }
        return false
    }

    return (
        <ScrollView>
            <Text style={styles.TitleTxt}>New Interview Record</Text>
            <Form style={styles.RecordForm}>
                {warning && <Text style={styles.WarningTxt}>{warning}</Text>}
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Company Name</Label>
                    <Left>
                        <Input placeholder="Please type..." value={company} onChangeText={(txt) => setcompany(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Interviewer</Label>
                    <Left>
                        <Input placeholder="Please type..." value={interviewer} onChangeText={(txt) => setinterviewer(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Interviewee</Label>
                    <Left>
                        <Input placeholder="Please type..." value={interviewee} onChangeText={(txt) => setinterviewee(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Job Title</Label>
                    <Left>
                        <Input placeholder="Please type..." value={jobtitle} onChangeText={(txt) => setjobtitle(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >
                    <Label style={styles.ItemLabel}>Expected Salary</Label>
                    <Left>
                        <Input placeholder="Please type..." value={salary} onChangeText={(txt) => setsalary(txt)} />
                    </Left>
                    <Right style={styles.ItemRight}></Right>
                </Item>
                <Item style={styles.RecordFormItem} >

                    <Label style={styles.ItemLabel}>Interview Date</Label>
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
                    <Label style={styles.ItemLabel}>Interview Time</Label>
                    <Left>
                        <Input placeholder="" value={displayTime} disabled={true} />
                    </Left>
                    <Right style={styles.ItemRight}>
                        <TouchableOpacity style={styles.ChooseBtn} onPress={() => showTimePicker()}>
                            <Text style={styles.ChooseTxt}>Choose</Text>
                        </TouchableOpacity>
                    </Right>
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