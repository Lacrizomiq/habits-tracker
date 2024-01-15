export class AddHabitDialog {
    constructor() {}

    _open = false

    init() {
        this.trigger = document.querySelector("#add-new-habit");
        this.dialog = document.querySelector("#add-habit-dialog");
        this.form = document.querySelector("#add-habit-form");

        this.trigger.addEventListener("click", () => {
            this.open = true
        })
    }

    get open() {
        return this._open;
    }

    set open(newOpen) {
        this._open = newOpen;
        if(newOpen) {
            this.dialog.setAttribute("open", "")
        } else {
            this.dialog.removeAttribute("open")
        }
        
    }
}