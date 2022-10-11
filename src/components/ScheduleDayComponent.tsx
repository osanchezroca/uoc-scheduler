import {Subject} from "../interfaces/Schedule";
import React, {useEffect, useRef} from "react";
// @ts-ignore
import ReactHover, {Hover, Trigger} from "react-hover";
import {compateTwoDates, fromUniversityToUTC} from "../helpers/dates";
import {ScheduleDayTaskComponent} from "./ScheduleDayTaskComponent";


interface Props {
    diaActual: Date;
    currentTime: Date;
    subjects: Array<Subject>
}

const ScheduleDayComponent = (props: Props) => {
    const {diaActual, subjects, currentTime} = props
    let isToday = false;
    const todayRef = useRef<null | HTMLDivElement>(null);
    const today = currentTime
    useEffect(() => {
        let ref = todayRef.current;
        if (isToday && ref) ref.scrollIntoView({block: 'center', behavior: "smooth"})
    }, [isToday])

    let mainStyle = {
        minHeight: '75px',
        height: '100%'
    }
    if (diaActual < today) {
        if (diaActual.getMonth() % 2) {
            mainStyle = Object.assign({backgroundColor: 'rgb(241,255,233)'}, mainStyle);
        } else {
            mainStyle = Object.assign({backgroundColor: 'rgb(230,252,215)'}, mainStyle);
        }
    }
    if (diaActual.getDate() === 1) {
        mainStyle = Object.assign({borderLeft: 'black 1px solid'}, mainStyle);
    }
    if (diaActual.getMonth() % 2) {
        mainStyle = Object.assign({
            backgroundColor: 'rgb(245,245,245)'
        }, mainStyle);
    }
    if ((compateTwoDates(today, diaActual))) {
        mainStyle = Object.assign(mainStyle, {
            backgroundColor: 'rgb(255,252,244)',
            outline: '3px solid orange',
            boxShadow: '0 0 3px',
            borderRadius: 8
        });
        isToday = true;
    }
    const subjectStyle = {
        minHeight: '32px',
        overflow: 'hidden',
        marginBottom: '1px',
    }
    const lineStyle = {
        minHeight: '20px',
        lineHeight: '20px',
        overflow: 'hidden',
        marginBottom: '1px',
        display: "flex"
    }
    const header = {
        fontFamily: ''
    }
    const filterSubject = (subject): any[] => subject.items?.filter(item => {
        const from = new Date(fromUniversityToUTC(item.from))
        from.setHours(0, 0, 0, 0);
        const to = new Date(fromUniversityToUTC(item.to))
        to.setHours(23, 59, 59, 999);
        return (diaActual => from || compateTwoDates(diaActual, from)) && (diaActual <= to || compateTwoDates(to, diaActual));
    })
    return (
        <div style={mainStyle} className={'border-end border-dotted'} ref={todayRef}>
            <div style={header} className={`w-100 text-start text-bold d-flex justify-content-between pe-1 ps-1`}>
                <div>{diaActual.getDate() === 1 ? diaActual.toLocaleDateString('es-ES', {month: 'long'}) : null}</div>
                {/*<div className={'d-flex-start'} style={{textShadow:'1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black'}}>*/}
                {/*    {subjects?.map((subject, index) => {*/}
                {/*            const activeTasks = filterSubject(subject)*/}
                {/*            return activeTasks && activeTasks.length ?*/}
                {/*                <div key={index}*/}
                {/*                     className={`badge text-${subject.color} m-0 p-1 text-truncate`}>{activeTasks.length}</div> : null;*/}
                {/*        }*/}
                {/*    )}*/}
                {/*</div>*/}
                <div style={{
                    fontFamily: 'Comic Sans MS',
                    color: 'rgb(0, 0, 120)',
                    textShadow: '0 0 1px gray'
                }}>{diaActual.getDate()}</div>
            </div>
            {subjects?.map((subject, index) => {
                const subjectsFiltered = filterSubject(subject)
                return (
                    <div key={index} style={subjectStyle}>
                        <div style={lineStyle}>
                            <div className={'d-flex flex-column'}>
                                {subjectsFiltered && subjectsFiltered.length ? subjectsFiltered
                                    .map((item, index) => <ScheduleDayTaskComponent
                                        key={index}
                                        item={item}
                                        diaActual={diaActual}
                                        lineStyle={lineStyle}
                                        today={today}
                                        subject={subject}
                                    />) : null}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
export default ScheduleDayComponent