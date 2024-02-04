import 'reflect-metadata';

interface ColumnOptions {
  type?: string;
  fieldName?: string;
}

export function Table(tableName: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('tableName', tableName, target);
  };
}

export function Column(options?: ColumnOptions): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const columns = Reflect.getMetadata('columns', target) || [];
    const columnOptions = Reflect.getMetadata('columnOptions', target) || {};

    columns.push(propertyKey);

    // If options are provided, set the type and fieldName
    if (options) {
      columnOptions[propertyKey] = options;
      Reflect.defineMetadata('columnOptions', columnOptions, target);
    }

    Reflect.defineMetadata('columns', columns, target);
  };
}
