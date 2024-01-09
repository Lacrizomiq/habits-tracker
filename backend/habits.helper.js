
import fs from "fs/promises"
import path from "path"

const databaseFile = path.join(process.cwd(), 'database.json')

const readDatabase = async () => {
  const database = await fs.readFile(databaseFile, "utf-8")
  const json = JSON.parse(database)
  return json
}

const writeData = async (newDatabase) => {
  const database = readDatabase()

  await fs.writeFile(
    databaseFile, 
    JSON.stringify(
      {
        ...database,
        ...newDatabase
      },
      null,
      2
    )
  )
}

export const getHabits = async () => {
  const database = await readDatabase()
  return database.habits
}

export const getTodayHabits = async () => {
  const today = new Date().toISOString().slice(0, 10)
  const habits = await getHabits()

  return habits.map(habit => {
    return {
      id: habit.id,
      title: habit.title,
      done: habit.daysDone[today] || false,
    }
  })
}

export const addHabit = async (title) => {
  const habits = await getHabits()

  const newHabits = {
    id: (habits[habits.length -1].id || 0) + 1,
    title,
    daysDone : {},
  }

  habits.push(newHabits)

  await writeData({habits})

  return newHabits
}

export const updateHabit = async (habitId, done) => {
  const habits = await getHabits()
  const toEditHabit = habits.find(a => a.id === habitId)

  if(!toEditHabit) {
    throw new Error("habitId is invalid")
  }

  const today = new Date().toISOString().slice(0, 10)
  toEditHabit.daysDone[today] = done

  await writeData({ habits})

  return toEditHabit

  
}