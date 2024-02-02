import 'reflect-metadata';

export function Table(tableName: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('tableName', tableName, target);
  };
}

export function Column(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const columns = Reflect.getMetadata('columns', target) || [];
    Reflect.defineMetadata('columns', [...columns, propertyKey], target);
  };
}
