import {Subject} from '../../interfaces/Schedule'
import React, {useEffect, useRef} from 'react'
import {compateTwoDates} from '../../helpers/dates'
import {TaskPill} from './TaskPill'
import {Box, HStack, VStack} from '@chakra-ui/react'


interface Props {
    cellDay: Date;
    currentTime: Date;
    subjects: Array<Subject>
}

const DayCell = (props: Props) => {
    const {cellDay, subjects, currentTime} = props
    let isToday = false
    const todayRef = useRef<null | HTMLDivElement>(null)
    const today = currentTime
    useEffect(() => {
        let ref = todayRef.current
        if (isToday && ref) ref.scrollIntoView({block: 'center', behavior: 'smooth'})
    }, [isToday])

    const filterTasks = (tasks): any[] => tasks?.filter(item => {
        let hasStartedToday = compateTwoDates(cellDay, item.from)
        let lastDay = compateTwoDates(cellDay, item.to)
        return hasStartedToday || lastDay
    })

    let mainStyle = {}
    if ((compateTwoDates(today, cellDay))) {
        mainStyle = Object.assign(mainStyle, {
            backgroundColor: 'rgb(255,252,244)',
            border: '3px solid orange',
        });
        isToday = true;
    }

    if (cellDay < today) {
        if (cellDay.getMonth() % 2) {
            mainStyle = Object.assign({backgroundColor: 'rgb(241,255,233)'}, mainStyle);
        } else {
            mainStyle = Object.assign({backgroundColor: 'rgb(230,252,215)'}, mainStyle);
        }
    }
    if(cellDay.getMonth() % 2){
        mainStyle = Object.assign({backgroundColor: 'rgb(245,245,245)'}, mainStyle);
    }
    return (
        <Box
            ref={todayRef}
            border={'dotted gray 1px'}
            minHeight={'110px'}
            height={'100%'}
            {...mainStyle}
        >
            <VStack justify={'start'} align={'stretch'} p={1}>
                <HStack justify={'space-between'}>
                    <Box/>
                    {/*<Box>{cellDay.getDate() === 1 ? cellDay.toLocaleDateString('es-ES', {month: 'long'}) : null}</Box>*/}
                    <Box fontFamily='Comic Sans MS'
                         color='rgb(0, 0, 120)'
                         textShadow='0 0 1px gray'
                    >{cellDay.getDate()}</Box>
                </HStack>
                <VStack>
                    {subjects?.map((subject, index) =>
                        filterTasks(subject.items).map((item, index) => (
                            <TaskPill
                                key={index}
                                item={item}
                                diaActual={cellDay}
                                today={today}
                                subject={subject}
                            />

                        ))
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}
export default DayCell