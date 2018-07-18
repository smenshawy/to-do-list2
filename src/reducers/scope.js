import {addDays, getDayMonDate, getWeekday, getMonDate, getTodayDate} from '../utils'

const scope = (state = {id: 'INBOX', title: 'Inbox', groups: [{}]}, action) => {
    console.log(action.type)
    switch(action.type){
        case 'SHOW_INBOX': {
            return {
                id: 'INBOX', 
                title: 'Inbox',
                groups: [{}],
            }
        }
        case 'SHOW_TODAY': {
            let today = getTodayDate()
            return {
                id: 'TODAY',
                title: 'Today',
                //groups: [{id: 'OVERDUE', title: 'Overdue'}, {title: 'Today', subtitle: getDayMonDate(today), date: today}]
                groups: [{title: 'Today', subtitle: getDayMonDate(today), date: today}]
            }
        }
        case 'SHOW_NEXT7DAYS': {
            let today = getTodayDate()
            let tomorrow = addDays(today, 1)
            let day3 = addDays(today, 2)
            let day4 = addDays(today, 3)
            let day5 = addDays(today, 4)
            let day6 = addDays(today, 5)
            let day7 = addDays(today, 6)
            let next7Days= [{title: 'Today', subtitle: getDayMonDate(today), date: today},
                {title: 'Tomorrow', subtitle: getDayMonDate(tomorrow), date: tomorrow},
                {title: getWeekday(day3), subtitle: getMonDate(day3), date: day3},
                {title: getWeekday(day4), subtitle: getMonDate(day4), date: day4},
                {title: getWeekday(day5), subtitle: getMonDate(day5), date: day5},
                {title: getWeekday(day6), subtitle: getMonDate(day6), date: day6},
                {title: getWeekday(day7), subtitle: getMonDate(day7), date: day7},
            ]
            return {
                id: 'NEXT_7_DAYS',
                title: 'Next 7 Days',
                //groups: [{id: 'OVERDUE', title: 'Overdue'}, ...next7Days],
                groups: next7Days,
            }
        }
        default:{
            return state
        }
    }
}

export default scope