export interface Event {
    from: string,
    to: string,
    task: string,
    required?: boolean
}

export interface Subject {
    abr: string,
    name: string,
    class?: string,
    color?: string,
    items?: Array<Event>
}