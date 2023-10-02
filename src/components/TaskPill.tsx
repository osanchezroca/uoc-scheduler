import React from 'react'
import {encodeSomething} from '../helpers/encoding'
import {compateTwoDates} from '../helpers/dates'
import {
    Button,
    ButtonGroup,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text
} from '@chakra-ui/react'

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
        borderRadius: 8,
        boxShadow: '0 0 3px gray',
        border: '1px solid white'
    }
    if (passed) {
        styleContainer.filter = 'grayscale(50%) opacity(70%)'
        stylePill.boxShadow = 'none'
        stylePill.border = 'none'
    }

    const codeId = encodeSomething(item)

    const toggleAtLocalStorage = (codeId: string) => () => {
        let started = localStorage.getItem(codeId)
        if (started) {
            localStorage.removeItem(codeId)
        } else {
            localStorage.setItem(codeId, new Date().toISOString())
        }
        window.location.reload()
        console.log('saved')
    }
    const isToggledAtLocalStorage = localStorage.getItem(codeId)
    // if (!assignedClass) return null
    return (<ButtonGroup gap={0}
            {...stylePill}>
            {isToggledAtLocalStorage && <Popover>
                <PopoverTrigger>
                    <Button p={0} m={0} size={'xs'}>❔</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader></PopoverHeader>
                    <PopoverBody><Text
                        m={0}>✅ {(new Date(isToggledAtLocalStorage)).toLocaleDateString()}</Text></PopoverBody>
                </PopoverContent>
            </Popover>
            }


        {hasStartedToday && <Button
                m={0}
                size={'xs'}>
                <HStack justify={'space-evenly'} align={'center'}>
                   <Text m={0}>😎</Text>
                </HStack>
            </Button>}
            <Button
                id={hasStartedToday ? codeId : ''}
                m={0}
                size={'xs'}
                colorScheme={subject.colorScheme}
                {...styleContainer}
                onClick={toggleAtLocalStorage(codeId)}
                title={item.task}>
                <HStack justify={'space-evenly'} align={'center'}>
                    <Text m={0}>{item.task}</Text>
                </HStack>
            </Button>
        {lastDay &&  <Button
                m={0}
                size={'xs'}>
                <HStack justify={'space-evenly'} align={'center'}>
                   <Text m={0}>😨</Text>
                </HStack>
            </Button>}
        </ButtonGroup>
    )
}
