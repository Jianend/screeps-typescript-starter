export class Healer {
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public static run(creep: Creep) {



    if (!creep.memory.healing) {


      let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: (c) => c.memory.role === 'attacker' && c.id !== creep.id
      });

      if (target) {
        creep.memory.healing = target.id;

      } else {
        delete creep.memory.healing;
      }

    }
    let target = Game.getObjectById(creep.memory.healing) as AnyCreep;


    if (creep.heal(target) === ERR_NOT_IN_RANGE) {


      creep.moveTo(target);
    }
  }
}

