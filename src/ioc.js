const { factory } = require('./factory');

class Container {
  constructor(ownFactory) {
    this.factory = ownFactory || factory;
  }

  register(name, obj) {
    this.factory.registerSingleton(name, obj);
  }

  get(name) {
    return this.factory.getSingleton(name);
  }
}

const ioc = new Container();

module.exports = {
  Container,
  ioc,
};
