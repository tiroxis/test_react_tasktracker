import * as React from "react";
import Task from "../../../models/Task";
import {
    ExpansionPanel, ExpansionPanelActions,
    ExpansionPanelDetails, ExpansionPanelSummary,
    IconButton,
    Theme, Typography,
    WithStyles,
    withStyles
} from "@material-ui/core";
import { createStyles } from '@material-ui/core';
import {ArrowDownward, Check, AccessAlarm, Delete, ModeEdit, Warning} from "@material-ui/icons";
import EventEmitter from 'eventemitter3';
import * as dateformat from "dateformat";

const styles = (theme: Theme) => createStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    heading: {
        marginTop: 15,
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightLight,
    },
    warning:{
        color:'#ffb122'
    },
    expired: {
        color:'#ff4617'
    },
    resolved: {
        color:'#00bb0d'
    },
    delete: {
        color:'#ff4617'
    }
});

interface ITaskItemProps extends WithStyles<typeof styles> {
    task: Task
    events: EventEmitter
}


class TaskItem extends React.Component<ITaskItemProps> {

    private className: string = '';

    constructor(props: any){
        super(props);

        // need fix redux-persist for Date object
        if(typeof(this.props.task.due_date) === 'string'){
            this.props.task.due_date = new Date(this.props.task.due_date);
        }

        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.toggleResolve = this.toggleResolve.bind(this);
    }

    public edit() {
        this.props.events.emit('edit', this.props.task);
    }

    public remove(){
        this.props.events.emit('remove', this.props.task);
    }

    public toggleResolve(e: React.MouseEvent) {
        e.stopPropagation();
        const isResolved = this.props.task.resolved_date === null;
        this.props.task.resolved_date = isResolved ? new Date() : null;
        this.props.events.emit((isResolved ?  'un' : '') + 'resolve', this.props.task);
        this.forceUpdate();

    }

    public render() {

        const status = () => {
            if (this.props.task.resolved_date) {
                return (<IconButton aria-label="Resolved" onClick={this.toggleResolve}>
                    <Check className={this.props.classes.resolved}/>
                </IconButton>);
            }
            return (<IconButton aria-label="Delete" onClick={this.toggleResolve}>
                <AccessAlarm />
            </IconButton>)


        };


        const resolvedText = () => {
            if(this.props.task.resolved_date !== null){
                return <div>Resolved: {dateformat(this.props.task.resolved_date, 'dd-mm-yyyy')}</div>
            }
            return '';
        };

        const dueText = () => {
            if(this.props.task.due_date !== null){
                return <div>Due date: {dateformat(this.props.task.due_date, 'dd-mm-yyyy')}</div>
            }
            return '';
        };

        let expired;
        if(this.props.task.resolved_date === null){
            const currentDate = new Date();
            const currentDateGormated = dateformat(currentDate, 'dd-mm-yyyy');
            if(this.props.task.due_date) {
                if(currentDateGormated === dateformat(this.props.task.due_date, 'dd-mm-yyyy')){
                    expired = (<IconButton aria-label="Warning">
                        <Warning className={this.props.classes.warning} />
                    </IconButton>)
                }else if(currentDate.getTime() > this.props.task.due_date.getTime()){
                    expired = (<IconButton aria-label="Expired">
                        <Warning className={this.props.classes.expired}/>
                    </IconButton>)
                }
            }

        }


        return (

            <ExpansionPanel className={this.className}>
                <ExpansionPanelSummary expandIcon={<ArrowDownward />}>
                    {status()}
                    {expired}
                    <Typography className={this.props.classes.heading}>{this.props.task.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography>
                            {this.props.task.description}
                        </Typography>
                        {dueText()}
                        {resolvedText()}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <IconButton aria-label="Edit" onClick={this.edit}>
                        <ModeEdit />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={this.remove}>
                        <Delete className={this.props.classes.delete} />
                    </IconButton>
                </ExpansionPanelActions>
            </ExpansionPanel>

        );
    }
};

export default withStyles(styles)(TaskItem);

