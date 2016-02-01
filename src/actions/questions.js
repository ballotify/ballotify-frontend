import * as types from '../constants/ActionTypes';
import { api } from '../utils/api';

export function getQuestions() {
  return {
    type: types.GET_QUESTIONS,
    payload: {
      promise: api.get('/questions')
    }
  };
}
