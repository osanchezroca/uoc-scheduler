import {useEffect, useMemo, useState} from 'react'
import * as jsonSchedule from '../src/config/database.json'
import Calendar from '../src/components/Calendar/Calendar'
import Navigation from '../src/components/Navigation/Navigation'
import {isSameMonth, isSameYear} from 'date-fns'
import {fromUniversityToUTC} from '../src/helpers/dates'

function Index() {
    const [date, setDate] = useState(new Date())

    function refreshClock() {
        setDate(new Date())
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000)
        return function cleanup() {
            clearInterval(timerId)
        }
    }, [])
    const importedSchedule = jsonSchedule
    const schedule = Object.assign({}, importedSchedule, {
        subjects: importedSchedule.subjects.map(subject => Object.assign({}, subject, {
            items: subject.items.map(item => Object.assign({}, item, {
                from: new Date(fromUniversityToUTC(item.from)),
                to: new Date(fromUniversityToUTC(item.to))
            }))
        }))
    })


    return (
        <div className=''>
            <div className={'d-flex flex-column'}>
                {/*<div className={"rounded d-flex flex-column sticky-top pb-2"}*/}
                {/*     style={{top: 0, backgroundColor: "", backdropFilter: "blur(2px)"}}>*/}
                {/*    <div className={'p-1'} style={{backgroundColor: '#73EDFF', color: '#000078'}}>*/}
                {/*        <h1 className={'text-center'}>{moment(date).format('dddd, HH:mm:ss')}</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={'container-lg p-0'}>
                    {useMemo(() =>
                            <Calendar currentTime={date} subjects={schedule.subjects} />,
                        [date.getUTCDate()])}
                </div>
                <div className={'rounded d-flex flex-column'}
                     style={{
                         bottom: 0, backgroundColor: '', backdropFilter: 'blur(2px)', position: 'sticky', zIndex: 1020
                     }}>
                    <div className={'container-lg p-0'}>
                        <Navigation currentTime={date} subjects={schedule.subjects} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
