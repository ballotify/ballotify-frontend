import { createAction } from 'redux-actions';
import { routeActions } from 'react-router-redux';
import * as types from '../constants/ActionTypes';
import { api } from '../utils/api';
import { cleanQuestion } from './newQuestion';

export function getQuestion(slug, params) {
    return {
         type: types.GET_QUESTION,
        payload: {
            promise: api.get(`/questions/${slug}`, params)
        }
    };
}

export function createQuestion(questionData) {
    return {
        type: types.CREATE_QUESTION,
        payload: {
            promise: api.post('/questions', questionData).then(response => {
                return (action, dispatch, getState) => {
                    dispatch(cleanQuestion());
                    dispatch(routeActions.push(`/questions/${response.slug}`));
                };
            })
        }
    };
}

export const addQuestionVote = createAction(
    types.ADD_QUESTION_VOTE, (choice) => {
        return {
            choice
        };
    }
);

export const removeQuestionVote = createAction(
    types.REMOVE_QUESTION_VOTE, (choice) => {
        return {
            choice
        };
    }
);

export const setQuestionVote = createAction(
    types.SET_QUESTION_VOTE, (choice) => {
        return {
            choice
        };
    }
);

export function voteOnQuestion(question) {
    return {
        type: types.VOTE_ON_QUESTION,
        payload: {
            promise: api.post(`/questions/${question.get('slug')}/votes`, question.get('currentVote').toJS()).then(response => {
                return (action, dispatch, getState) => {
                    dispatch(cleanQuestion());
                    dispatch(routeActions.push(`/questions/${question.get('slug')}/results`));
                };
            })
        }
    };
}
