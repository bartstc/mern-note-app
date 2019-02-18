import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Note = props => {
  const { note, index, editNote, doneEdit, cancelEdit, deleteNote } = props;
  const { _id, editing, titleValue, descriptionValue, date } = props.note;

  return (
    <li className="note-item">
      <div className="note-item-panel">
        <h4 className="note-item-title">{titleValue}</h4>
        <div onClick={() => deleteNote(_id)} className="remove-item">
          &times;
        </div>
      </div>
      <Moment className="note-item-date" format="YYYY.MM.DD, HH:mm">{date}</Moment>

      {!editing &&
        <div
          className="note-item-label"
          onClick={() => editNote(note, index)}>
          {descriptionValue}
        </div>
      }
      {editing &&
        <textarea
          data-gramm="false"
          className="note-item-edit"
          type="text"
          autoFocus
          defaultValue={descriptionValue}
          onBlur={(e) => doneEdit(note, index, e)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              doneEdit(note, index, e);
            } else if (e.key === 'Escape') {
              cancelEdit(note, index);
            };
          }}
        />
      }
    </li>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  editNote: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default Note;