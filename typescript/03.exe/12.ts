class Task {
    public title: string;
    public description: string;
    public completed = false;
    private _createdBy: string;

    constructor(title: string, description: string, createdBy: string) {
        this.title = title;
        this.description = description;
        this._createdBy = createdBy;
    }

    get createdBy() {
        return this._createdBy;
    }

    toggleStatus() {
        this.completed = !this.completed;
    }

    getDetails(): string {
        return `Task: ${this.title} - ${this.description} - ${
            this.completed ? 'Completed' : 'Pending'
        }`;
    }

    public static createSampleTasks(): Task[] {
        return [
            new Task('title', 'description', 'created by'),
            new Task('title2', 'description2', 'created by2')
        ];
    }
}

const task1 = new Task("Complete homework", "Finish math exercises", "Charlie");
task1.toggleStatus();
console.log(task1.getDetails());