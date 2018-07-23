import ITask, {TaskPriority} from "../../models/Task";

import { getType } from 'typesafe-actions';
import {add, filter, remove, save} from "../actions/task";

export const initialState = {
    filter: '',
    list: [
        {
            id: 1,
            title: 'Task 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend scelerisque arcu, nec aliquam libero iaculis in. Aenean vel ligula lectus. Morbi euismod massa nec eros fringilla aliquam. Phasellus iaculis est ut odio tincidunt, sed elementum magna finibus. Fusce laoreet sapien ac urna fringilla scelerisque. Mauris egestas vel nibh viverra varius. In ultrices lacus pretium, viverra diam nec, consectetur ipsum. Maecenas nibh risus, porta ac ullamcorper sed, pellentesque vitae nulla. Donec accumsan aliquet velit, eget tristique purus suscipit vel. Quisque feugiat purus non dui aliquet sagittis. Cras ac justo eleifend, rhoncus orci et, rutrum eros. Nunc nec leo ac dolor luctus congue eget sit amet lacus.\n' +
            '\n' +
            'In iaculis diam eleifend erat euismod volutpat. Aliquam ultricies id mi in porta. Pellentesque porta quis sapien at aliquam. Sed lobortis, urna malesuada sagittis facilisis, arcu ex sagittis nulla, sed feugiat ante diam vel risus. Ut fermentum lorem ac risus mollis elementum. Nullam nec consequat orci, a accumsan metus. Nullam vel tincidunt nibh. Phasellus nulla felis, luctus vitae enim nec, elementum dapibus magna. Nam ac placerat tellus. Morbi finibus rhoncus augue, eu feugiat nulla tristique quis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend scelerisque arcu, nec aliquam libero iaculis in. Aenean vel ligula lectus. Morbi euismod massa nec eros fringilla aliquam. Phasellus iaculis est ut odio tincidunt, sed elementum magna finibus. Fusce laoreet sapien ac urna fringilla scelerisque. Mauris egestas vel nibh viverra varius. In ultrices lacus pretium, viverra diam nec, consectetur ipsum. Maecenas nibh risus, porta ac ullamcorper sed, pellentesque vitae nulla. Donec accumsan aliquet velit, eget tristique purus suscipit vel. Quisque feugiat purus non dui aliquet sagittis. Cras ac justo eleifend, rhoncus orci et, rutrum eros. Nunc nec leo ac dolor luctus congue eget sit amet lacus.\n' +
            '\n' +
            'In iaculis diam eleifend erat euismod volutpat. Aliquam ultricies id mi in porta. Pellentesque porta quis sapien at aliquam. Sed lobortis, urna malesuada sagittis facilisis, arcu ex sagittis nulla, sed feugiat ante diam vel risus. Ut fermentum lorem ac risus mollis elementum. Nullam nec consequat orci, a accumsan metus. Nullam vel tincidunt nibh. Phasellus nulla felis, luctus vitae enim nec, elementum dapibus magna. Nam ac placerat tellus. Morbi finibus rhoncus augue, eu feugiat nulla tristique quis.',
            priority: TaskPriority.Normal,
            created_date: new Date(),
            resolved_date: null,
            due_date: null,
        } as ITask,
        {
            id: 2,
            title: 'Task 2',
            description: 'Description task 2',
            priority: TaskPriority.Important,
            created_date: new Date(),
            resolved_date: new Date(),
            due_date: null,
        } as ITask,
        {
            id: 3,
            title: 'Task 3',
            description: 'Description task 3',
            priority: TaskPriority.Urgent,
            created_date: new Date(),
            resolved_date: null,
            due_date: null,
        } as ITask,
        {
            id: 4,
            title: 'Task 4',
            description: 'Description task 4',
            priority: TaskPriority.Normal,
            created_date: new Date(),
            resolved_date: null,
            due_date: null,
        } as ITask,
        {
            id: 5,
            title: 'Task 5',
            description: 'Description task 5',
            priority: TaskPriority.Important,
            created_date: new Date(),
            resolved_date: null,
            due_date: null,
        } as ITask,
    ]
};

const tasksReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case getType(add):
                state.list.push(action);
                return {
                    ...state
                };
            break;

        case getType(save):
                const taskSearch = state.list.filter(task => task.id !== action.id);
                if(taskSearch.length){
                    taskSearch[0] = action;
                }
                return {
                    ...state
                };
            break;
        case getType(remove):
            state.list = state.list.filter(task => task.id !== action.id)
            return {
                ...state
            };
            break;

        case getType(filter):
            state.filter = action.filter;
            console.log(state);
            return {
                ...state
            }

        default:
            return state;
    }
};

export default tasksReducer;