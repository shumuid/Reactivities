export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date; // | null; //Date union null
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> { //this way all of the properties inside IActivityFormValues are optional
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init? : IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}