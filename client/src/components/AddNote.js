import React from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ handleChange, addNote, titleValue }) => {
  return (
    <input
      maxLength="25"
      onChange={handleChange}
      onKeyUp={addNote}
      name="titleValue"
      value={titleValue}
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