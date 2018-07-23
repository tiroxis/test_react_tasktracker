import * as React from 'react';
import {connect} from "react-redux";
import TaskList from "./components/entity/task/List";
import ITask, {TaskPriority} from "./models/Task";
import * as EventEmitter from "eventemitter3";
import {add, filter, remove, save} from "./store/actions/task";
import {Button} from "@material-ui/core";

interface IApp {
    tasks: ITask[];
    onSave: (task: ITask) => void;
    onAdd: (task: ITask) => void;
    onRemove: (task: ITask) => void;
    onFilter: (filter: any) => void;
}

class App extends React.Component<IApp> {

    public events = new EventEmitter();

    constructor(props: any) {
        super(props);

        this.events.on('remove', (task) => {
            this.props.onRemove(task);
        });

        const saveChanges = (task: ITask) => {
            console.log(task)
            if(task.id){
                this.props.onSave(task);
            }else{
                this.props.onAdd(task);
            }
        };

        this.events.on('save', saveChanges);
        this.events.on('resolve', saveChanges);
        this.events.on('unresolve', saveChanges);

        this.setFilter = this.setFilter.bind(this);
    }

    public setFilter(filterData: TaskPriority | string){
        return () => {
            this.props.onFilter({filter: filterData});
        }
    }

    public render() {
        return (
              <div className="App">
                  <Button variant="outlined" onClick={this.setFilter('')}>All</Button>
                  <Button variant="outlined" onClick={this.setFilter(TaskPriority.Normal) }>Normal</Button>
                  <Button variant="outlined" onClick={this.setFilter(TaskPriority.Important) }>Important</Button>
                  <Button variant="outlined" onClick={this.setFilter(TaskPriority.Urgent) }>Urgent</Button>
                  <TaskList tasks={this.props.tasks} events={this.events}/>
              </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        tasks: (state.tasks.filter)
            ?
            state.tasks.list.filter((item: ITask) => {
                // if need more that one filter - need to add objects compare
                return (item.priority ===  state.tasks.filter )
            })
            :
            state.tasks.list
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAdd: (task: ITask) => dispatch(add(task)),
        onSave: (task: ITask) => dispatch(save(task)),
        onRemove: (task: ITask) => dispatch(remove(task)),
        onFilter: (filterData: any) => dispatch(filter(filterData))
    }
};
const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
