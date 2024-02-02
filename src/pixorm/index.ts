import 'reflect-metadata';
import * as decorators from './decorators';

export class PixORM {
  static generateSchema(target: any): string {
    const tableName = Reflect.getMetadata('tableName', target);
    const columns = Reflect.getMetadata('columns', target.prototype);

    if (!tableName || !columns) {
      throw new Error('Invalid model definition');
    }

    const columnDefinitions = columns.map((column: string | symbol) => {
      return `${column.toString()} VARCHAR(255)`; // For simplicity, consider all columns as VARCHAR(255)
    });

    const schema = `
      -- Auto-generated schema from PixORM
      -- Model: ${target.name}
      -- Generated at: ${new Date().toISOString()}
      
      CREATE TABLE ${tableName} (
        ${columnDefinitions.join(', ')}
      );
    `;

    return schema;
  }
}

export const Table = decorators.Table;
export const Column = decorators.Column;
