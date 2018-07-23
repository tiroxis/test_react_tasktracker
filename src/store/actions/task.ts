import { createStandardAction } from 'typesafe-actions';
import ITask, {TaskPriority} from "../../models/Task";
import cuid from 'cuid';

export enum ActionTypes {
    ADD = 'task/add',
    SAVE = 'task/save',
    REMOVE = 'task/remove',
    SET_FILTER = 'task/filter',
}

export const add = createStandardAction(ActionTypes.ADD).map(
    (payload: ITask) => ({
        ...payload,
        id: cuid(),
    })
);
export const save = createStandardAction(ActionTypes.SAVE).map((payload: ITask) => payload);
export const remove = createStandardAction(ActionTypes.REMOVE).map((payload: ITask) => payload);
export const filter = createStandardAction(ActionTypes.SET_FILTER).map((payload: { filter : TaskPriority|string }) => payload);