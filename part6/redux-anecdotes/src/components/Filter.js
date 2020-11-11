import React from 'react'
import { connect } from 'react-redux';
import { filterUpdate } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    props.filterUpdate(event.target.value);
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterUpdate,
}

export default connect(null, mapDispatchToProps)(Filter)
