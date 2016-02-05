import { handleActions } from 'redux-actions';
import { EDIT_QUESTION_TITLE, ADD_QUESTION_CHOICE, EDIT_QUESTION_CHOICE, DELETE_QUESTION_CHOICE, TOGGLE_QUESTION_OPTION } from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    title: null,
    isMultiple: false,
    isRandomized: false,
    isPrivate: false,
    choices: []
});

const newQuestion = handleActions({
    EDIT_QUESTION_TITLE: (state, action) => {
        return state.merge(action.payload);
    },

    CLEAN_QUESTION: (state, action) => {
        return Immutable.Map({
            title: null,
            choices: Immutable.List()
        });
    },

    ADD_QUESTION_CHOICE: (state, action) => {
        const newChoice = Immutable.Map({
            title: action.payload.title,
            id: state.get('choices').reduce((maxId, choice) => Math.max(choice.get('id'), maxId), -1) + 1
        });

        return state.updateIn(['choices'], (arr) => arr.push(newChoice));
    },

    EDIT_QUESTION_CHOICE: (state, action) => {
        return state.updateIn(['choices'], (arr) => arr.update(
            arr.findIndex(item => item.get('id') === action.payload.id),
            (item) => item.merge(action.payload.choice)
        ));
    },

    DELETE_QUESTION_CHOICE: (state, action) => {
        return state.updateIn(['choices'], arr => arr.filter(item => item.get('id') != action.payload.id));
    },

    TOGGLE_QUESTION_OPTION: (state, action) => {
        return state.set(action.payload.option, !state.get(action.payload.option));
    }

}, initialState);

export default newQuestion;
