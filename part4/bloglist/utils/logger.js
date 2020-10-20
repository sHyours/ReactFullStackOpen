const info = function(...para) {
  console.log(...para);
};
const error = function(...para) {
  console.error(...para);
};
module.exports = {
  info,
  error
};