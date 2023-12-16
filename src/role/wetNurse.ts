
export class Healer {
  creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

 public static run(creep:Creep) {
    if (creep.memory.healing && creep.heal(creep.memory.healing) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.memory.healing);
    } else {
      let target =creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: (c) => c.memory.role==='attacker' && c.id !==creep.id
      });
      if (target) {
        creep.memory.healing = target.id;
      } else {
        target =creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
          creep.memory.healing = target.id;
        } else {
          delete creep.memory.healing;
        }
      }
    }
  }
}
