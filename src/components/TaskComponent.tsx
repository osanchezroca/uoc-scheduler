import React from 'react'
import {Event, Subject} from '../interfaces/Schedule'
import {diffDates, getNumberOfDays} from '../helpers/dates'
import {Badge, Card, CardBody, HStack, Progress, Text, VStack} from '@chakra-ui/react'

interface Props {
    subject?: Subject
    task: Event
    currentTime: Date
}

const TaskComponent = (props: Props) => {
    const {subject, task, currentTime} = props
    const now = new Date()
    const to = new Date(task.to)
    const from = new Date(task.from)
    to.setDate(to.getDate() + 1)
    const nowToTo = diffDates(now, to)
    const toToFrom = diffDates(from, to)
    const progress = Math.trunc((toToFrom - nowToTo) / toToFrom * 100)
    const timeFromBeginning = getNumberOfDays(from, to)
    const timeToEnd = getNumberOfDays(currentTime, to)
    return (
        <Card>
            <CardBody p={1}>
                <VStack order={Math.ceil(100 - progress)} align={'stretch'}>
                    <HStack justify={'space-between'}>
                        <span className={'text-truncate'}>{task.task}</span>
                        <HStack>
                            <Text m={0}>{from.getUTCDate()}/{from.getUTCMonth()}</Text>
                            <Text m={0} fontWeight={'bold'}>-</Text>
                            <Text m={0}>{to.getUTCDate()}/{to.getUTCMonth()}</Text>
                            <Badge>{timeToEnd}/{timeFromBeginning}</Badge>
                        </HStack>
                    </HStack>
                    <Progress colorScheme={subject.colorScheme} size='lg' value={progress} />
                </VStack>
            </CardBody>
        </Card>
    )
}
export default TaskComponent