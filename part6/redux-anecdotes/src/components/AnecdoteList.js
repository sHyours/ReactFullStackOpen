import React from 'react';
import { voteUpdate } from "../reducers/anecdoteReducer";
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer';
const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    console.log('vote', anecdote.id, anecdote)
    props.voteUpdate(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 });
    props.setNotification(`you voted '${anecdote.content}'`, 5);
  }
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote.filter((a) => ~a.content.indexOf(state.filter)).sort((a, b) => a.votes - b.votes)
  }
};

const mapDispatchToProps = {
  voteUpdate,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)