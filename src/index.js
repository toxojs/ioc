const factory = require('./factory');
const ioc = require('./ioc');

module.exports = {
  ...factory,
  ...ioc,
};
