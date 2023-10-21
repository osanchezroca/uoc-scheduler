import React from 'react'
import {Event, Subject} from '../../interfaces/Schedule'
import {diffDates, getNumberOfDays} from '../../helpers/dates'
import {Badge, Card, CardBody, HStack, Progress, Text, VStack} from '@chakra-ui/react'
import {encodeSomething} from '../../helpers/encoding'

interface Props {
    subject?: Subject
    task: Event
    currentTime: Date
}

const TaskProgress = (props: Props) => {
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
    const codeId = encodeSomething(Object.assign({}, task, {subject: undefined}))
    const isToggledAtLocalStorage = localStorage.getItem(codeId)
    const onClickAnchor = () => {
        document
            .getElementById(codeId)
            .scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
    }
    return (
        <Card onClick={() => onClickAnchor()}
              border={isToggledAtLocalStorage?'2px green solid':'2px gray dashed'}
              backgroundColor={isToggledAtLocalStorage?'green.50':'gray.50'}>
            <CardBody p={1} fontSize={'sm'}>
                <VStack order={Math.ceil(100 - progress)} align={'stretch'}>
                    <HStack justify={'space-between'}>
                        <span className={'text-truncate'}>{task.task}</span>
                        <HStack>
                            <Text m={0} fontSize={'xs'}>Desde {from.getUTCDate()}/{from.getUTCMonth() + 1}</Text>
                            <Text m={0} fontWeight={'bold'}>Hasta {to.getUTCDate() - 1}/{to.getUTCMonth() + 1}</Text>
                            <Badge>Quedan {timeToEnd} dias</Badge>
                            <Text m={0} fontSize={'xs'}>de {timeFromBeginning}</Text>
                        </HStack>
                    </HStack>
                    <Progress colorScheme={subject.colorScheme} size='xs' value={progress} />
                </VStack>
            </CardBody>
        </Card>
    )
}
export default TaskProgress