import { getTodayHabits, updateHabitDone } from "../api/habits-api"
import { HabitSquare } from "./HabitSquare"

export class TodayHabits {
    constructor() {}

    habitsSquare = []

    async init() {
        this.element = document.querySelector("#today-habits")
        this.refresh()
    }

    async refresh() {
        try {
            this.todayHabits = await getTodayHabits()
            this.render()
        } catch {
            alert("Impossible to get habits")
        }
    }

    async toggle(id, done) {
        
        try {
            await updateHabitDone(id, !done)
            this.refresh()
        } catch {
            alert("Impossible to update habit")
        }
    }

    async render() {
        this.element.innerHTML = ""

        this.habitsSquare = this.todayHabits.map(habit => {
            const habitSquare = new HabitSquare(habit.id, habit.title, habit.done)
            habitSquare.addEventListener("toggle", () => {
                this.toggle(habitSquare.id, habitSquare.done)
            })
            this.element.appendChild(habitSquare.element)
        })
    }
}