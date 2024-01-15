import { getAllHabits } from '../api/habits-api';

export class HabitHistoryDialog {
  static instance;
  constructor() {
    if (HabitHistoryDialog.instance) {
      throw new Error('Use HabitHistoryDialog.getInstance()');
    }
  }

  static getInstance() {
    if (!HabitHistoryDialog.instance) {
      HabitHistoryDialog.instance = new HabitHistoryDialog();
    }
    return HabitHistoryDialog.instance;
  }

  init() {
    this.trigger = document.querySelector('#open-history');
    this.dialog = document.querySelector('#habits-history-dialog');

    this._open = false;

    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (this.open === false) return;

      this.open = false;
    });

    this.trigger.addEventListener('click', () => {
      this.open = true;
    });
  }

  get open() {
    return this._open;
  }

  set open(value) {
    this._open = value;

    if (this._open) {
      this.dialog.setAttribute('open', '');
      // Update or render the history
      this.render();
    } else {
      this.dialog.removeAttribute('open');
    }
  }

  async render() {
    const habits = await getAllHabits();
    const lowestDate = getLowestDate(habits);
    const dates = getDatesRange(lowestDate);
    const table = document.createElement('table');

    table.appendChild(createTableHeader(dates));
    createTableRows(habits, dates).forEach((row) => table.appendChild(row));

    const tableWrapper = document.querySelector('#table-wrapper');
    tableWrapper.innerHTML = '';
    tableWrapper.appendChild(table);
  }
}

const getLowestDate = (habits) => {
  return habits
    .reduce((acc, habit) => {
      return [...acc, ...Object.keys(habit.daysDone)];
    }, [])
    .map((date) => new Date(date))
    .sort((a, b) => a - b)[0];
};

const getDatesRange = (lowestDate) => {
  const diff = Math.ceil((new Date() - lowestDate) / (1000 * 60 * 60 * 24));
  return Array.from({ length: diff}).map((_, index) => {
    const date = new Date(lowestDate);
    date.setDate(date.getDate() + index);
    return date.toISOString().split('T')[0];
  });
};

const createTableHeader = (dates) => {
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Habit';
  headerRow.appendChild(headerCell);

  dates.forEach((date) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = date;
    headerRow.appendChild(headerCell);
  });

  return headerRow;
};

const createTableRows = (habits, dates) => {
  const rows = [];
  habits.forEach((habit) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = habit.title;
    row.appendChild(cell);

    dates.forEach((date) => {
      const cell = document.createElement('td');
      const doneDay = habit.daysDone[date];
      cell.textContent = doneDay ? '✅' : '❌';
      row.appendChild(cell);
    });

    rows.push(row);
  });

  return rows;
};