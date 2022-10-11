import ScheduleDayComponent from "./ScheduleDayComponent";
import React from "react";
import {Subject} from "../interfaces/Schedule";
import {isFirstDayOfMonth} from 'date-fns'
import MonthInfoComponent from "./MonthInfoComponent";

interface Props {
    subjects: Array<Subject>
    currentTime: Date
}

const ScheduleComponent = (props: Props) => {
    const {subjects, currentTime} = props
    let weeksLength = 19;
    const acc = {}
    subjects.map(subject => subject.items.map(item => {
        return acc[item.from] = new Date(item.from)
    }))
    const semesterStartDate = new Date('2022-9-25')
    const date = new Date('2022-7-31')
    return (
        <>
            <div className="sticky-top" style={{
                backgroundColor: '#73EDFF',
                color: '#000078',
                display: "grid",
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))'
            }}>
                {[...Array(7)].map((_, dia) => {
                    date.setDate(date.getDate() + 1)
                    return (
                        <div key={dia} style={{fontFamily: ''}}
                             className={'border-bottom border-dark fs-4 text-center'}>
                            <span className={'d-none d-md-block'}>
                                {date.toLocaleDateString('es-ES', {weekday: 'long'})}
                            </span>
                            <span className={'d-block d-md-none'}>
                                {date.toLocaleDateString('es-ES', {weekday: 'short'})}
                            </span>
                        </div>
                    );
                })}
            </div>
            {[...Array(weeksLength)].map((_, semana) => {
                return (
                    <div key={semana} style={{display: "grid", gridTemplateColumns: 'repeat(7, minmax(0, 1fr))'}}>
                        {[...Array(7)].map((_, dia) => {
                                semesterStartDate.setDate(semesterStartDate.getDate() + 1)
                            const currentDate = new Date(semesterStartDate)
                                return (
                                    <React.Fragment key={dia}>
                                        {isFirstDayOfMonth(currentDate) ? <>
                                            <div style={{
                                                gridColumn: 'span 7'
                                            }}>
                                                <MonthInfoComponent subjects={subjects} currentDate={currentDate}/>
                                            </div>
                                        </> : null}

                                        <div className={'col border-bottom border-dark p-0 m-0'} style={{gridColumn: currentDate.getDay()}}>
                                            <ScheduleDayComponent
                                                currentTime={currentTime}
                                                diaActual={new Date(currentDate.toISOString())}
                                                subjects={subjects}/>
                                        </div>
                                    </React.Fragment>
                                );
                            }
                        )}
                    </div>
                );
            })}
        </>
    )
}
export default ScheduleComponent