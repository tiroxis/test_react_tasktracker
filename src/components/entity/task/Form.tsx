import * as React from "react";
import {Button, createStyles, MenuItem, TextField, Theme, WithStyles, withStyles} from "@material-ui/core";
import Task, {default as ITask, TaskPriority} from "../../../models/Task";
import EventEmitter from 'eventemitter3';
import * as dateformat from "dateformat";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

interface ITaskFormProps extends WithStyles<typeof styles> {
    task: Task
    events: EventEmitter
}

class TaskForm extends React.Component<ITaskFormProps> {

    public state = {
        task: {} as ITask
    };

    constructor(props: any){
        super(props);

        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);

    }

    public componentDidMount(){
        this.setState({
            task : this.props.task
        });
    }

    public cancel() {
        this.props.events.emit('cancel', this.props.task);
    }

    public save() {
        this.props.events.emit('save', this.props.task);
    }

    public onChange(prop:string) {
        return (e: any) => {
            const newTaskValue = this.state.task;
            newTaskValue[prop] = e.target.value;
            this.setState({ task: newTaskValue });
        };
    }

    public onChangeDate(prop:string){
        return (e: any) => {
            if(e.type !== null && e.target.value !== ''){
                const newTaskValue = this.state.task;
                newTaskValue[prop] = new Date(e.target.value);
                this.setState({ task: newTaskValue });
            }
        };
    }

    public render() {
        console.log(this.props.task.due_date);
        return (
            <div>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Title"
                    multiline={true}
                    margin="normal"
                    fullWidth={true}
                    value={this.props.task.title}
                    onChange={this.onChange('title')}
                />

                <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                    multiline={true}
                    margin="normal"
                    fullWidth={true}
                    value={this.props.task.description}
                    onChange={this.onChange('description')}
                />

                <TextField
                    id="priority"
                    label="TaskPriority"
                    placeholder="TaskPriority"
                    select={true}
                    margin="normal"
                    fullWidth={true}
                    value={this.props.task.priority.toString()}
                    onChange={this.onChange('priority')}
                >
                    {Object.keys(TaskPriority).map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="due_date"
                    label="due_date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth={true}
                    value={(this.props.task.due_date !== null) ? dateformat(this.props.task.due_date, 'yyyy-mm-dd') : ''}
                    onChange={this.onChangeDate('due_date')}
                />

                <Button variant="contained" color="primary" onClick={this.save}>Save</Button>
                <Button variant="contained" color="secondary" onClick={this.cancel}>Cancel</Button>

            </div>
        );
    }
}
export default withStyles(styles)(TaskForm);