import * as React from "react";

import {default as ITask, TaskPriority} from "../../../models/Task";
import TaskItem from "./Item";
import TaskForm from "./Form";
import {
    Button,
    createStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import EventEmitter from 'eventemitter3';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

interface ITaskListProps extends WithStyles<typeof styles> {
    tasks: ITask[],
    events: EventEmitter;
}

class TaskList extends React.Component<ITaskListProps> {

    public state = {
        openEditForm : false,
        isEditFormForNew : false,
        selected_task: {
            id: 0,
            title: '',
            description: '',
            priority: TaskPriority.Normal,
            created_date: new Date(),
            resolved_date: new Date(),
            due_date: null,
        } as ITask,
    };
    public events = new EventEmitter();

    constructor(props: any){
        super(props);


        this.events = this.props.events || this.events;

        this.events.on('edit', (task)=> {
            this.setState({
                openEditForm : true,
                isEditFormForNew: false,
                selected_task : task
            })
        });

        this.events.on('save', (task)=> {
            this.setState({
                openEditForm : false,
                isEditFormForNew: false,
                selected_task : task
            });
        });

        this.events.on('cancel', (task)=> {
            this.setState({
                openEditForm : false,
                isEditFormForNew: false,
            })
        });

        this.add_new = this.add_new.bind(this);
    }


    public add_new(){
        this.setState({
            openEditForm : true,
            isEditFormForNew: true,
            selected_task: {
                id: 0,
                title: '',
                description: '',
                priority: TaskPriority.Normal,
                created_date: new Date(),
                resolved_date: null,
                due_date: null,
            } as ITask
        })
    }

    public render() {

        const modalTitle = (this.state.isEditFormForNew) ? 'Create new task' : 'Edit task';
        return (
            <div>
                {this.props.tasks.map((item, index) => (
                    <TaskItem task={item} events={this.events}/>
                ))}


                <Dialog
                    open={this.state.openEditForm}
                    // onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
                    <DialogContent>
                        <TaskForm task={this.state.selected_task} events={this.events} />
                    </DialogContent>
                </Dialog>

                <Button variant="contained" color="primary" onClick={this.add_new}>Add new task</Button>
            </div>
        );
    }
}



export default withStyles(styles)(TaskList);
