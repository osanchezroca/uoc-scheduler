import {Subject} from "../interfaces/Schedule";
import React, {useEffect, useRef} from "react";
// @ts-ignore
import ReactHover, {Hover, Trigger} from "react-hover";
import {encodeSomething} from "../helpers/encoding";
import {compateTwoDates, fromUniversityToUTC} from "../helpers/dates";


export const ScheduleDayTaskComponent = (props: any) => {
    const {item, diaActual, lineStyle, today, subject} = props
    const from = item.from
    const to = item.to
    let hasStartedToday = compateTwoDates(diaActual, from)
    let lastDay = compateTwoDates(diaActual, to)
    let passed = (today.getTime() - to.getTime()) > 0
    // if (!hasStartedToday && !lastDay) return null

    let styleContainer = {
        filter: '',
        marginLeft: '',
        marginRight: '',
        maxWidth: '100%',
    }
    let stylePill = {
        width: 'auto',
        lineHeight: lineStyle.lineHeight,
        fontSize: 14,
        overflow: 'none',
        order: 1,
        borderLeft: '',
        borderRight: '',
        boxShadow: '0 0 3px gray',
        border: '1px solid white',
        margin: '5px'
    }
    if (passed) {
        styleContainer.filter = 'grayscale(50%) opacity(70%)'
        stylePill.boxShadow = 'none'
        stylePill.border = 'none'
    }

    let showTask = false;
    let emoji = '';
    if (hasStartedToday && lastDay) {
        showTask = true
    } else if (hasStartedToday) {
        styleContainer.marginLeft = '10%'
        stylePill.borderLeft = 'black 1px solid'
        emoji = '😎'
        showTask = true
    } else if (lastDay) {
        styleContainer.marginRight = '10%'
        stylePill.borderRight = 'black 2px solid'
        emoji = '😨'
        showTask = true
    }
    if (!item.required) {
        stylePill.fontSize = 12
    }
    // if (!assignedClass) return null
    return (
        <div className={`d-flex rounded`} style={styleContainer}
             id={hasStartedToday ? encodeSomething(Object.assign({}, item, {day: diaActual.getMilliseconds()})) : ''}>

            <div className={`badge bg-${subject.color} p-0 m-1 text-truncate`}
                 style={stylePill}
                 title={item.task}>
                {emoji}{showTask ? item.task : null}
            </div>
        </div>
    )
}
