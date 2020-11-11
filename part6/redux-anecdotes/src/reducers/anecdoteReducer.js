import anecdoteService from '../services/anecdoteService';
const initialState = [];

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECODOTES':
      return action.data;
    case 'VOTE':
      state = state.map((anecdote) => {
        return anecdote.id === action.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote;
      });
      break;
    case 'CREATE':
      state = state.concat(action.data);
      break;
    default:
      break;
  }
  return state
}

export const initAnecdote = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECODOTES',
      data,
    });
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create({
      content, votes: 0
    });
    dispatch({
      type: 'CREATE',
      data
    });
  }
}

export const voteUpdate = (id, data) => {
  return async (dispatch) => {
    console.log('voteUpdate',data);
    await anecdoteService.update(id, data);
    dispatch({
      type: 'VOTE',
      id: id
    })
  }
}

export default reducer