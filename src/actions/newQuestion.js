import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const editQuestionTitle = createAction(
    types.EDIT_QUESTION_TITLE, (title) => {
        return {
            title
        };
    }
);

export const addQuestionChoice = createAction(
    types.ADD_QUESTION_CHOICE, (title) => {
        return {
            title
        };
    }
);

export const editQuestionChoice = createAction(
    types.EDIT_QUESTION_CHOICE, (id, choice) => {
        return {
            id,
            choice
        };
    }
);

export const deleteQuestionChoice = createAction(
    types.DELETE_QUESTION_CHOICE, (id) => {
        return {
            id
        };
    }
);

export const cleanQuestion = createAction(types.CLEAN_QUESTION);
