import { SchemaModal } from './core/schema';
import {
  StringType,
  NumberType,
  BooleanType,
  ObjectType,
  DateType,
  ArrayType,
} from './types';

export { SchemaModal };
export const SchemaTypes = {
  String: StringType,
  Number: NumberType,
  Boolean: BooleanType,
  Object: ObjectType,
  Array: ArrayType,
  Date: DateType,
};
export default {
  Modal: SchemaModal,
  Types: {
    StringType,
    NumberType,
    BooleanType,
    ObjectType,
    ArrayType,
    DateType,
  },
};
