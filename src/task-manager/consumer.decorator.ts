import { TaskProps } from "./TaskManagerFactory";

interface Consumer {
  constructor: string,
  methods: string[],
}

const consumers: Consumer[] = [];

export const Consumer = (target: Object, propertyKey: string) => {
  const consumer = consumers.find(value => value.constructor === target.constructor.name);
  if (!consumer) {
    consumers.push({
      constructor: target.constructor.name,
      methods: [propertyKey],
    });
  } else {
    consumer.methods.push(propertyKey);
  }
}

export function GetConsumers(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: TaskProps[]) {
    const task = args[0];
    const consumer = consumers.find((consumer) => consumer.constructor === task.consumer.name);
    task.methods = consumer?.methods.concat() || [];
    const result = originalMethod.apply(this, args);
    return result;
  };
  return descriptor;
}