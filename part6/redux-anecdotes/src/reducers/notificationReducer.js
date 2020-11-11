const initialState = { show: false, message: 'initialState' };
let timer = null;
export const notificationUpdate = (message) => {
  return {
    type: 'NOTIFICATION_UPDATE',
    message
  }
};
export const notificationDelete = () => {
  return {
    type: 'DELETE',
  }
};
export const setNotification = (message, timeout) => {
  return (dispatch) => {
    console.log(message, timeout);
    dispatch({
      type: 'NOTIFICATION_UPDATE',
      message
    });
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => dispatch({
      type: 'DELETE',
    }), timeout * 1000);
  }
};

export default (state = initialState, { type, message }) => {
  switch (type) {
    case 'NOTIFICATION_UPDATE':
      return {
        show: true,
        message
      };
    case 'DELETE':
      return {
        show: false,
        data: ''
      }
    default:
      return state
  }
}