import './style.css'
import { TodayHabits } from './ui/TodayHabits'   
import { AddHabitDialog } from './ui/AddHabitDialog'
import { HabitHistoryDialog } from './ui/HabitHistoryDialog'

const todayHabits = TodayHabits.getInstance()

todayHabits.init()

const addHabitDialog = AddHabitDialog.getInstance()
addHabitDialog.init()

const habitHistoryDialog = HabitHistoryDialog.getInstance()
habitHistoryDialog.init()