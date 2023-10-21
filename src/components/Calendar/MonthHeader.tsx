import React from 'react'
import {Subject} from '../../interfaces/Schedule'
import {isSameMonth, isSameYear} from 'date-fns'

interface Props {
    subjects: Array<Subject>
    currentDate: Date
}

const MonthHeader = (props: Props) => {
    const {subjects, currentDate} = props
    const filteredSubjects = subjects.map(subject => Object.assign({}, subject, {items: subject.items.filter(item => isSameMonth(new Date(item.from), currentDate) && isSameYear(new Date(item.from), currentDate) || isSameMonth(new Date(item.to), currentDate) && isSameYear(new Date(item.to), currentDate))}))
    return <div className={'d-flex justify-content-between align-items-center'}>
        <h1>{currentDate.toLocaleString('default', {month: 'long'})}</h1>
        <div>Entregas: {filteredSubjects.reduce((acc, subject) => acc + subject.items.filter(item => !!item.required).length, 0)}</div>
        <div>Opcionales: {filteredSubjects.reduce((acc, subject) => acc + subject.items.filter(item => !item.required).length, 0)}</div>
    </div>

}
export default MonthHeader