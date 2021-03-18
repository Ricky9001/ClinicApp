
const DateTimeHelper = {
    formatDateTime: (value, mode) => {
        let rtnvalue = ''
        if (mode == 'date') {
            var year = value.getFullYear();
            var month = '0' + (value.getMonth() + 1);
            var day = '0' + value.getDate();
            rtnvalue = year + "/" + month.substr(-2) + "/" + day.substr(-2);
        }
        else {
            var hours = '0' + value.getHours();
            var minutes = "0" + value.getMinutes();
            rtnvalue = hours.substr(-2) + ":" + minutes.substr(-2);
        }
        return rtnvalue
    },
    ParseDateTimeToSQL: (date, time) => {

        var year = date.getFullYear();
        var month = '0' + (date.getMonth() + 1);
        var day = '0' + date.getDate();
        var hours = '0' + time.getHours();
        var minutes = "0" + time.getMinutes();
        let rtnstring = year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hours.substr(-2) + ":" + minutes.substr(-2);
        return rtnstring;
    },
    setStartEndTime: (date, mode) => {
        var rtndate = new Date(date)
        if(mode == 'start')
        {
            rtndate.setHours(0, 0);
        }
        else{
            // console.log(rtndate)
            rtndate.setHours(23, 59);
        }
        return rtndate;
    },
    FormatMonthToStartEndDateSQL: (CalendarItem) => {
        let rtnItem = { startdatesql: '', enddatesql: '' }
        var year = CalendarItem.year
        var month = CalendarItem.month
        var starttime = new Date()
        starttime.setHours(0, 0);
        var endtime = new Date()
        endtime.setHours(23, 59);
        var startdate = new Date(year, month - 1, 1)
        var enddate = new Date(year, month, 0)
        rtnItem.startdatesql = DateTimeHelper.ParseDateTimeToSQL(startdate, starttime)
        rtnItem.enddatesql = DateTimeHelper.ParseDateTimeToSQL(enddate, endtime)        
        return rtnItem
    },
    formatCalendarDate: (value)=>
    {
        var year = value.getFullYear();
        var month = '0' + (value.getMonth() + 1);
        var day = '0' + value.getDate();
        return year + "-" + month.substr(-2) + "-" + day.substr(-2);
    },
    FindWeekStartEndDate: (curr) =>
    {
        var current = curr;     // get current date    
        var weekstart = current.getDate() - current.getDay();    
        var weekend = weekstart + 6;       // end day is the first day + 6 
        var sunday = new Date(current.setDate(weekstart));  
        var saturday = new Date(current.setDate(weekend));
        return {
            weekstart: sunday,
            weekend: saturday
        }
    }

}

export default DateTimeHelper