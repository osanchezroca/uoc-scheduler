import DayCell from "./DayCell";
import React from "react";
import {Subject} from "../interfaces/Schedule";
import {isFirstDayOfMonth} from 'date-fns'
import MonthInfoComponent from "./MonthInfoComponent";
import {Box, SimpleGrid} from '@chakra-ui/react'

interface Props {
    subjects: Array<Subject>
    currentTime: Date
}

const ScheduleComponent = (props: Props) => {
    const {subjects, currentTime} = props
    let weeksLength = 19;
    const semesterStartDate = new Date('2023-9-24')
    const date = new Date('2023-9-24')
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
                             className={'border-bottom border-dark fs-6 text-center'}>
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
                    <SimpleGrid key={semana} columns={7}>
                        {[...Array(7)].map((_, dia) => {
                                semesterStartDate.setDate(semesterStartDate.getDate() + 1)
                            const currentDate = new Date(semesterStartDate)
                            const weekDayNumber = currentDate.getDay() || 7
                                return (
                                    <React.Fragment key={dia}>
                                        {isFirstDayOfMonth(currentDate) ? <>
                                            <div style={{
                                                gridColumn: 'span 7'
                                            }}>
                                                <MonthInfoComponent subjects={subjects} currentDate={currentDate}/>
                                            </div>
                                        </> : null}

                                        <Box p={0} m={0} gridColumn={weekDayNumber}>
                                            <DayCell
                                                currentTime={currentTime}
                                                cellDay={new Date(currentDate.toISOString())}
                                                subjects={subjects}/>
                                        </Box>
                                    </React.Fragment>
                                );
                            }
                        )}
                    </SimpleGrid>
                );
            })}
        </>
    )
}
export default ScheduleComponent