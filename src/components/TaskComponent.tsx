import React from "react";
import {Event, Subject} from "../interfaces/Schedule";
import {diffDates, fromUniversityToUTC, getNumberOfDays} from "../helpers/dates";

interface Props {
    subject?: Subject
    task: Event
    currentTime: Date
}

const TaskComponent = (props: Props) => {
    const {subject, task, currentTime} = props
    const now = new Date()
    const to = new Date(fromUniversityToUTC(task.to))
    const from = new Date(fromUniversityToUTC(task.from))
    to.setDate(to.getDate() + 1);
    const nowToTo = diffDates(now, to)
    const toToFrom = diffDates(from, to)
    const progress = Math.trunc((toToFrom - nowToTo) / toToFrom * 100)
    const timeFromBeginning = getNumberOfDays(from, to)
    const timeToEnd = getNumberOfDays(currentTime, to)
    const background = (subject && subject.class) ?? ''
    return (
        <div className={`p-0`} style={{order: Math.ceil(100 - progress)}}>
            <div className={`rounded ${background} p-1 m-1`}>
                <div className={`card p-1`}>
                    <div className={`row`} style={{fontSize: '0.9em'}}>
                        <div className={`col-9  col-sm-8 d-flex flex-column justify-content-end`}>
                            <span className={"text-truncate"}>{task.task}</span>
                            <div className="progress">
                                <div
                                    className={`progress-bar progress-bar-striped ${background}`}
                                    role="progressbar" style={{width: `${progress}%`}}/>
                            </div>
                        </div>
                        <div className={`col-3 col-sm-4 d-flex flex-column justify-content-end`}>
                            <div>
                                <small>{from.getUTCDate()}/{from.getUTCMonth()}</small> - <small>{to.getUTCDate()}/{to.getUTCMonth()}</small>
                            </div>
                            <span
                                className={'badge bg-secondary'}>{timeToEnd}/{timeFromBeginning}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskComponent