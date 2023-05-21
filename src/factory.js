const defaultInitializer = (Clazz, settings) => new Clazz(settings);

class Factory {
  shelves = new Map();

  static getName(obj) {
    if (typeof obj === 'string') {
      return obj;
    }
    return obj.constructor?.name !== 'Function'
      ? obj.constructor.name
      : obj.name;
  }

  getShelve(shelveName) {
    if (!this.shelves.has(shelveName)) {
      this.shelves.set(shelveName, new Map());
    }
    return this.shelves.get(shelveName);
  }

  getFromShelve(shelveName, name) {
    const shelve = this.getShelve(shelveName);
    return shelve.get(Factory.getName(name));
  }

  setIntoShelve(shelveName, name, value) {
    const shelve = this.getShelve(shelveName);
    shelve.set(Factory.getName(name), value);
  }

  register(name, clazz) {
    const shelve = this.getShelve('classes');
    if (typeof name === 'string') {
      shelve.set(name, clazz);
    } else {
      shelve.set(name.name, name);
    }
  }

  getClass(name) {
    return this.getFromShelve('classes', name);
  }

  registerInitializer(name, initializer) {
    this.setIntoShelve('initializers', name, initializer);
  }

  getInitializer(obj) {
    return this.getFromShelve('initializers', obj) || defaultInitializer;
  }

  registerCloner(name, cloner) {
    this.setIntoShelve('cloners', name, cloner);
  }

  getCloner(obj) {
    return this.getFromShelve('cloners', obj);
  }

  registerSerializer(name, serializer) {
    this.setIntoShelve('serializers', name, serializer);
  }

  getSerializer(obj) {
    return this.getFromShelve('serializers', obj);
  }

  registerDeserializer(name, deserializer) {
    this.setIntoShelve('deserializers', name, deserializer);
  }

  getDeserializer(obj) {
    return this.getFromShelve('deserializers', obj);
  }

  getInstance(obj, settings) {
    const name = Factory.getName(obj);
    const clazz = this.getClass(name);
    if (!clazz) {
      return undefined;
    }
    const initializer = this.getInitializer(name);
    return initializer(clazz, settings);
  }

  registerSingleton(name, singleton) {
    this.setIntoShelve('singletons', name, singleton);
  }

  getSingleton(name) {
    return this.getFromShelve('singletons', name);
  }
}

const factory = new Factory();

module.exports = {
  Factory,
  factory,
};
