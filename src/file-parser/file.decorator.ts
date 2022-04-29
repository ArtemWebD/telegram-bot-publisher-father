import FileParser from './FileParser';

export const File = () => {
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const fileParser = new FileParser();
    descriptor.value = async function (...args: any[]) {
      const msg = args[0];
      if (!msg) {
        return originalMethod.apply(this, args);
      }
      const file = await fileParser.parse(
        msg.audio || msg.voice || msg.document || msg.video || msg.photo,
      );
      args.push(file);
      return originalMethod.apply(this, args);
    };
  };
};
