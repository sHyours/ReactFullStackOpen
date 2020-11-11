const initialState = '';

export const filterUpdate = (payload) => ({
  type: 'FILTER_UPDATE',
  payload
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FILTER_UPDATE':
      return payload;
    default:
      return state
  }
}

