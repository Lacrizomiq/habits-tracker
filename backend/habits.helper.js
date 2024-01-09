import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, 'database.json');

// ... le reste de votre code

export function getHabits() {
  const rawData = fs.readFileSync(databasePath);
  return JSON.parse(rawData).habits;
}

export function getTodayHabits() {
  const today = new Date().toISOString().slice(0, 10);
  return getHabits().filter(habit => habit.daysDone[today]);
}

export function addHabit(title) {
  const habits = getHabits();
  const newHabit = {
    id: Date.now(),
    title,
    daysDone: {}
  };
  habits.push(newHabit);
  fs.writeFileSync(databasePath, JSON.stringify({ habits }));
  return newHabit;
}

export function updateHabit(id, done) {
  const habits = getHabits();
  const habitToUpdate = habits.find(habit => habit.id === id);
  if (!habitToUpdate) return false;

  const today = new Date().toISOString().slice(0, 10);
  habitToUpdate.daysDone[today] = done;
  
  fs.writeFileSync(databasePath, JSON.stringify({ habits }));
  return true;
}
