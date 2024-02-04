import 'reflect-metadata';
import * as decorators from './decorators';

export class PixORM {
  static generateSchema(target: any): string {
    const tableName = Reflect.getMetadata('tableName', target);
    const columns = Reflect.getMetadata('columns', target.prototype);
    const columnOptions =
      Reflect.getMetadata('columnOptions', target.prototype) || {};

    if (!tableName || !columns) {
      throw new Error('Invalid model definition');
    }

    const columnDefinitions = columns.map((column: string | symbol) => {
      const options = columnOptions[column] || {};

      const type = options.type || this.inferType(target, column);
      const fieldName = options.fieldName || column.toString();

      return `${fieldName} ${type}`;
    });

    const schema = `-- Auto-generated schema from PixORM
-- Model: ${target.name}
-- Generated at: ${new Date().toISOString()}

CREATE TABLE ${tableName} (
  ${columnDefinitions.join(',\n  ')}
);`;

    return schema;
  }

  private static inferType(target: any, column: string | symbol): string {
    const propertyType = Reflect.getMetadata(
      'design:type',
      target.prototype,
      column
    );

    if (!propertyType) {
      throw new Error(`Cannot infer type for column '${column.toString()}'`);
    }

    if (propertyType === Number) {
      return 'NUMERIC';
    } else if (propertyType === String) {
      return 'TEXT';
    } else if (propertyType === Date) {
      return 'TIMESTAMP';
    } else {
      return 'VARCHAR(255)';
    }
  }
}

export const Table = decorators.Table;
export const Column = decorators.Column;
