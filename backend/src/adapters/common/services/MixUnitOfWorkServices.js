export default function MixUnitOfWorkService(Gateway) {
  return class UnitOfWorkService extends Gateway {
    constructor(...args) {
      super(...args);
    }
    logg(){
        return 'this is logging';
    }
    startTransaction(){
        return 'this is start transition'
    }
    commitTransaction(){
        return ''
    }
    rollbackTransaction(){
        return ''
    }
  };
}
