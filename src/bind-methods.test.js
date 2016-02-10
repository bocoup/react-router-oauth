import bindMethods from './bind-methods';

describe('bindMethods', function() {

  beforeEach(function() {
    class Test {
      constructor(foo) {
        this.foo = foo;
      }
      bar(arg) {
        return this.foo + arg;
      }
      baz(arg) {
        return this.foo + arg;
      }
    }
    this.Test = Test;
  });

  it('javascript 101', function() {
    const obj = new this.Test(100);
    expect(obj.bar(1)).to.equal(101);
    expect(obj.baz(2)).to.equal(102);

    const {bar, baz} = obj;
    const obj2 = {bar, baz, foo: 9000};
    expect(obj2.bar(1)).to.equal(9001);
    expect(obj2.baz(2)).to.equal(9002);
  });

  it('should bind all methods by default', function() {
    const obj = new this.Test(100);

    bindMethods(obj);

    const {bar, baz} = obj;
    const obj2 = {bar, baz, foo: 9000};
    expect(obj2.bar(1)).to.equal(101);
    expect(obj2.baz(2)).to.equal(102);
  });

  it('should bind only the specified methods', function() {
    const obj = new this.Test(100);

    bindMethods(obj, ['bar']);

    const {bar, baz} = obj;
    const obj2 = {bar, baz, foo: 9000};
    expect(obj2.bar(1)).to.equal(101);
    expect(obj2.baz(2)).to.equal(9002);
  });

});
