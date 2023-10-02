import {useState} from 'react'
import {Subject} from '../interfaces/Schedule'
import TaskComponent from './TaskComponent'
import {encodeSomething} from '../helpers/encoding'
import {diffDates} from '../helpers/dates'
import {Box, Button, HStack, SimpleGrid} from '@chakra-ui/react'

interface Props {
    subjects: Array<Subject>
    currentTime: Date
}

const InProgressComponent = (props: Props) => {
    const {subjects, currentTime} = props
    const [filter, setFilter] = useState<string | null>(null)
    const selectFilter = (name: string) => {
        if (name !== filter) {
            setFilter(name)
        } else {
            setFilter(null)
        }
    }
    const goTo = (item: any) => {
        const id = encodeSomething(item)
        const ref = document.getElementById(id)
        if (ref) ref.scrollIntoView()
    }
    const getProgress = (from, to) => {
        const beforefrom = new Date(from)
        const beforeto = new Date(to)
        const beforenowToTo = diffDates(currentTime, beforeto)
        const beforetoToFrom = diffDates(beforefrom, beforeto)
        return (beforetoToFrom - beforenowToTo) / beforetoToFrom * 100

    }
    return (
        <>
            <SimpleGrid columns={{base: 1, md: 4}} gap={2}>
                {subjects
                    .filter((item) => filter ? filter === item.name : true)
                    .reduce((acc = [], subject) => {
                        const modifiedSubject = Object.assign({}, subject)
                        modifiedSubject.items = undefined
                        return acc.concat(subject.items.map(item => Object.assign({}, item, {subject: modifiedSubject})))
                    }, [])
                    .filter(item => {
                        const from = new Date(item.from)
                        from.setHours(0, 0, 0, 0)
                        const to = new Date(item.to)
                        to.setHours(23, 59, 59, 999)
                        return currentTime.getTime() >= from.getTime() && currentTime.getTime() < to.getTime()
                    }).sort((before, now) =>
                        getProgress(now.from, now.to) - getProgress(before.from, before.to)
                    )
                    .map((item, i) => (
                        <Box key={i} onClick={() => goTo(item)} cursor={'pointer'}>
                            <TaskComponent subject={item.subject} currentTime={currentTime} task={item} />
                        </Box>
                    ))}
            </SimpleGrid>
            <div className={'d-flex p-1 justify-content-around navbar navbar-light'}
                 style={{backgroundColor: '#73EDFF', color: '#000078'}}>
                <div className='container-fluid'>
                    <HStack>
                        <Button
                            className={`btn me-2 bg-light  ${'0' === filter ? 'active' : null}`}
                            onClick={() => selectFilter('0')}>X
                        </Button>
                        {subjects.map((subject, i) => (
                            <Button
                                key={i}
                                colorScheme={subject.colorScheme}
                                onClick={() => selectFilter(subject.name)}
                            >{subject.abr}</Button>
                        ))}
                    </HStack>
                </div>
            </div>
        </>
    )
}
export default InProgressComponent