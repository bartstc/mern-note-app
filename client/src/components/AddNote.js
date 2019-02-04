import React from 'react';
import PropTypes from 'prop-types';

const AddItem = props => {
  return (
    <input
      maxLength="25"
      onChange={props.handleChange}
      onKeyUp={props.addNote}
      name="titleValue"
      value={props.titleValue}
      type="text"
      className="note-input"
    />
  );
};

AddItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired
};

export default AddItem;