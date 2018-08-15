import Type from '../core/type';

class ArrayType extends Type {
  static from(n) {
    return n;
  }

  constructor(errorMessage = 'Please enter a valid array') {
    super('array');

    super.addRule(v => Array.isArray(v), errorMessage);
  }

  rangeLength(minLength, maxLength, errorMessage) {
    super.addRule(
      v => v.length >= minLength && v.length <= maxLength,
      errorMessage
    );

    return this;
  }

  minLength(minLength, errorMessage) {
    super.addRule(v => v.length >= minLength, errorMessage);

    return this;
  }

  maxLength(maxLength, errorMessage) {
    super.addRule(v => v.length <= maxLength, errorMessage);

    return this;
  }

  unrepeatable(errorMessage) {
    super.addRule(items => {
      const hash = {};

      for (const i in items) {
        if (hash[items[i]]) {
          return false;
        }

        hash[items[i]] = true;
      }

      return true;
    }, errorMessage);

    return this;
  }

  of(type, errorMessage) {
    super.addRule(items => {
      const valids = items.map(value => type.check(value));
      const errors = valids.filter(item => item.hasError) || [];

      if (errors.length) {
        return errors[0];
      }

      return errors.length === 0;
    }, errorMessage);

    return this;
  }
}

export default errorMessage => new ArrayType(errorMessage);
