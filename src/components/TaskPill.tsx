import React from 'react'
import {encodeSomething} from '../helpers/encoding'
import {compateTwoDates} from '../helpers/dates'
import {Button, HStack, Text} from '@chakra-ui/react'


export const TaskPill = (props: any) => {
    const {item, diaActual, today, subject} = props
    let hasStartedToday = compateTwoDates(diaActual, item.from)
    let lastDay = compateTwoDates(diaActual, item.to)
    let passed = (today.getTime() - item.to.getTime()) > 0
    if (!hasStartedToday && !lastDay) return null

    let styleContainer = {
        filter: ''
    }
    let stylePill = {
        overflow: 'none',
        borderLeft: '',
        borderRight: '',
        boxShadow: '0 0 3px gray',
        border: '1px solid white'
    }
    if (passed) {
        styleContainer.filter = 'grayscale(50%) opacity(70%)'
        stylePill.boxShadow = 'none'
        stylePill.border = 'none'
    }


    // if (!assignedClass) return null
    return (
        <Button
            id={hasStartedToday ? encodeSomething(item) : ''}
            size={'xs'}
            colorScheme={subject.colorScheme}
            {...stylePill}
            {...styleContainer}
            title={item.task}>
            <HStack justify={'space-evenly'} align={'center'}>
                {hasStartedToday && <Text m={0}>😎</Text>}
                <Text m={0}>{item.task}</Text>
                {lastDay && <Text m={0}>😨</Text>}
            </HStack>
        </Button>
    )
}
