import StringType from '../types/string';

class Schema {
  constructor(schema) {
    this.schema = schema;
  }

  getFieldType(fieldName) {
    return this.schema[fieldName] || new StringType();
  }

  checkForField(fieldName, fieldValue) {
    const fieldChecker = this.schema[fieldName] || new StringType();

    if (!fieldChecker) {
      return { hasError: false };
    }

    return fieldChecker.check(fieldValue);
  }

  check(value) {
    const checkResult = {};

    value = value || {};

    Object.keys(this.schema).forEach(key => {
      checkResult[key] = this.checkForField(key, value[key]);
    });

    return checkResult;
  }
}

export { Schema };
export const SchemaModal = o => new Schema(o);
