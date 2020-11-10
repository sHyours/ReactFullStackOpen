import React from 'react';
import { createAnecdote} from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux';
const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  const ancedoteCreate = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = '';
    dispatch(createAnecdote(content));
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ancedoteCreate}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  ) 
};
export default AnecdoteForm;