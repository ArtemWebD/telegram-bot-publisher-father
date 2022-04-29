import Database from '../database/Database';
import { Class } from '../task-manager/TaskManagerFactory';

export const Module = (Controller: Class) => {
  const database = Database.getInstance();
  database.isInited() ? null : database.init();

  return (target: Class) => {
    const controller = new Controller();
    const methods = Object.getOwnPropertyNames(controller.__proto__);
    Object.keys(Controller.prototype).forEach(function (value) {
      if (Controller.prototype[value] instanceof Function) {
        controller[value]();
      }
    });
    return target;
  };
};
