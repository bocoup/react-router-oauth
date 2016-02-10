export default function(obj, methodNames) {
  const protoObj = Object.getPrototypeOf(obj);

  let methods = methodNames;
  if (!methods) {
    const propNames = Object.getOwnPropertyNames(protoObj);
    methods = propNames.filter(name => typeof protoObj[name] === 'function');
  }

  methods.forEach(name => {
    obj[name] = protoObj[name].bind(obj);
  });
}
