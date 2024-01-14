
const BASE_URL = "http://127.0.0.1:3000"

export const getTodayHabits = async () => {
    return fetch(`${BASE_URL}/habits/today`).then(res => res.json())
}

export const updateHabitDone = (id, done) => 
    fetch(`${BASE_URL}/habits/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ done }),
    }
    ).then(res => res.json())
