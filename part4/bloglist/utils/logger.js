const info = function(...para) {
  if(process.env.NODE_ENV !== 'test'){
    console.log(...para);
  }
};
const error = function(...para) {
  console.error(...para);
};
module.exports = {
  info,
  error
};