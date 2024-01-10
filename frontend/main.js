import './style.css'

const getTodayHabits = async () => {
    return fetch('http://127.0.0.1:3000/habits/today').then(res => res.json())
}
    

class TodayHabits {
    constructor() {}

    async init() {
        this.element = document.querySelector("#today-habits")
        this.refresh()
    }

    async refresh() {
        this.todayHabits = await getTodayHabits()
        console.log(this)
    }
}

const todayHabits = new TodayHabits()

todayHabits.init()