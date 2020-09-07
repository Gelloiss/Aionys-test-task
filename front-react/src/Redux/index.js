const initialState = {
  notes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTES':
      return { ...state, notes: [ ...state.notes, ...action.payload ] };
    case 'ADD_NOTE':
      return { ...state, notes: [ ...state.notes, action.payload ] };
    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(it => it.id !== action.payload) };
    case 'UPDATE_NOTE':
      return { ...state, notes: state.notes.map(it => it.id === action.payload.id ? action.payload  : it) };
    default:
      return state;
  }
};

export const mapStateToProps = state => ({
  notes: state.notes,
});

export const mapDispatchToProps = dispatch => {
  return {
    onNotesAdd: (notes) => {
      dispatch({
        type: 'ADD_NOTES',
        payload: notes,
      });
    },
    onNoteAdd: (id, text) => {
      dispatch({
        type: 'ADD_NOTE',
        payload: { id, text },
      });
    },
    onNoteDelete: (id) => {
      dispatch({
        type: 'DELETE_NOTE',
        payload: id,
      });
    },
    onNoteUpdate: (id, text) => {
      dispatch({
        type: 'UPDATE_NOTE',
        payload: { id, text },
      });
    },
  };
}
