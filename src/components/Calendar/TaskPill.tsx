import React, {useState} from 'react'
import {encodeSomething} from '../../helpers/encoding'
import {compateTwoDates} from '../../helpers/dates'
import {
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Textarea
} from '@chakra-ui/react'

export const TaskPill = (props: any) => {
    const {item, diaActual, today, subject} = props
    let hasStartedToday = compateTwoDates(diaActual, item.from)
    let lastDay = compateTwoDates(diaActual, item.to)
    let passed = (today.getTime() - item.to.getTime()) > 0
    const codeId = encodeSomething(item)
    const [pillData, setPillData] = useState(localStorage.getItem(codeId))
    const [notes, setNotes] = useState(localStorage.getItem(codeId + '_notes') || '')
    if (!hasStartedToday && !lastDay) return null

    const changeNotes = (e) => {
        setNotes(e.target.value)
        localStorage.setItem(codeId + '_notes', e.target.value)
    }
    const toggleAtLocalStorage = (codeId: string) => () => {
        if (pillData) {
            setPillData(null)
            localStorage.removeItem(codeId)
        } else {
            setPillData(new Date().toISOString())
            localStorage.setItem(codeId, new Date().toISOString())
        }
        // window.location.reload()
        console.log('saved')
    }
    const isToggledAtLocalStorage = localStorage.getItem(codeId)

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

    // if (!assignedClass) return null
    return (
        <Popover>
            <PopoverTrigger>
                <ButtonGroup gap={0} {...stylePill} borderY={'2px'} w={'100%'}
                             borderColor={isToggledAtLocalStorage ? 'white' : 'gray'}
                             borderStyle={isToggledAtLocalStorage ? 'solid' : 'dashed'}>

                    <Button
                        id={hasStartedToday ? codeId : ''}
                        w={'100%'}
                        m={0}
                        size={'xs'}
                        colorScheme={subject.colorScheme}
                        {...styleContainer}
                        p={1}
                        title={item.task}>
                        <HStack justify={'space-evenly'} align={'center'}>
                            {hasStartedToday && <Text m={0}>😎</Text>}
                            {!hasStartedToday && <Text m={0}>🏁</Text>}
                            <Text m={0}>{item.task}</Text>
                        </HStack>
                    </Button>
                </ButtonGroup>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>&nbsp;</PopoverHeader>
                <PopoverBody>
                    {isToggledAtLocalStorage ? (
                        <HStack justify={'space-between'}>
                            <Button
                                onClick={toggleAtLocalStorage(codeId)}>
                                ✅ Finalizado
                            </Button>
                            <Text>{(new Date(isToggledAtLocalStorage)).toLocaleDateString()}</Text>
                        </HStack>
                    ) : (
                        <Button
                            onClick={toggleAtLocalStorage(codeId)}>
                            ❌ Validar
                        </Button>)}
                    <FormControl>
                        <FormLabel>Notas</FormLabel>
                        <Textarea onChange={(e) => changeNotes(e)}>{notes}</Textarea>
                    </FormControl>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
