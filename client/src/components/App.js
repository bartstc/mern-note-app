import React, { Component } from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../App.css';

import Note from './Note';
import AddNote from './AddNote';

class App extends Component {
  state = {
    beforeEditCache: '',
    titleValue: '',
    descriptionValue: 'Enter note content ...',
    notes: []
  };

  componentDidMount() {
    axios.get('http://localhost:4000/notes/')
      .then(res => {
        this.setState({
          notes: res.data
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  addNote = e => {
    if (e.key === 'Enter') {
      const titleValue = this.state.titleValue;
      if (!titleValue) return;
      const descriptionValue = this.state.descriptionValue;

      const newNote = {
        titleValue,
        descriptionValue,
        editing: false
      };

      const notes = [...this.state.notes, newNote];
      this.setState({
        notes,
        titleValue: ''
      });

      axios.post('http://localhost:4000/notes/', newNote);
    };
  };

  deleteNote = _id => {
    this.setState({ notes: this.state.notes.filter(note => note._id !== _id) });

    axios.delete(`http://localhost:4000/notes/${_id}`);
  };

  editNote = (note, index) => {
    this.setState((prevState) => {
      let notes = prevState.notes;
      note.editing = true;
      notes.splice(index, 1, note);

      if (note.descriptionValue === this.state.descriptionValue) note.descriptionValue = '';

      return { notes, beforeEditCache: note.descriptionValue };
    });
  };

  doneEdit = (note, index, e) => {
    e.persist();

    this.setState((prevState) => {
      let notes = prevState.notes;
      note.editing = false;

      if (e.target.value.trim().length === 0) {
        note.descriptionValue = prevState.beforeEditCache;
      } else {
        note.descriptionValue = e.target.value;
      };

      if (note.descriptionValue === '') note.descriptionValue = this.state.descriptionValue;

      notes.splice(index, 1, note);

      return { notes };
    });

    axios.post(`http://localhost:4000/notes/${note._id}`, note);
  };

  cancelEdit = (note, index) => {
    this.setState((prevState) => {
      let notes = prevState.notes;
      note.descriptionValue = prevState.beforeEditCache;
      note.editing = false;

      notes.splice(index, 1, note);

      return { notes };
    });
  };

  render() {
    return (
      <div className="App">
        <div className="note-container">
          <h1 className="heading">Note</h1>

          <AddNote
            handleChange={this.handleChange}
            addNote={this.addNote}
            titleValue={this.state.titleValue}
          />
          <ReactCSSTransitionGroup
            className="note-list"
            transitionName="fade"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {this.state.notes.map((note, index) => (
              <Note
                key={index}
                note={note}
                index={index}
                editNote={this.editNote}
                doneEdit={this.doneEdit}
                cancelEdit={this.cancelEdit}
                deleteNote={this.deleteNote}
              />
            ))}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
};

export default App;
