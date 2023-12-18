// export class Warrior {
//     public creep: Creep;
//
//     constructor(creep: Creep) {
//         this.creep = creep;
//     }
//
//     public static run(creep: Creep) {
//         // 寻找并攻击敌人
//         const targets = creep.room.find(FIND_HOSTILE_CREEPS);
//         if (targets.length > 0) {
//             const target = creep.pos.findClosestByRange(targets);
//
//             if (target != null && creep.attack(target) === ERR_NOT_IN_RANGE) {
//                 creep.moveTo(target)
//             }
//             //   if (target) {
//             //     this.creep.attack(target);
//             //   }
//         } else {
//
//
//             const flag = _.filter(Game.flags, (flag) => flag.name === '战场');
//
//           if(!creep.pos.isNearTo(flag[0])) {
//             creep.moveTo(flag[0]);
//           }
//
//         }
//     }
// }
export class Warrior {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
  }

  public static run(creep: Creep) {
    // 寻找并攻击敌人
    const targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length > 0) {
      const target = creep.pos.findClosestByRange(targets);

      if (target != null && creep.attack(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      // 如果没有敌方creep，寻找并攻击敌方建筑
      const hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);
      if (hostileStructures.length > 0) {
        const targetStructure = creep.pos.findClosestByRange(hostileStructures);
        if (targetStructure != null && creep.attack(targetStructure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targetStructure);
        }
      } else {
        // 如果没有敌方建筑，移动到指定位置
        const flag = _.filter(Game.flags, (flag) => flag.name === '战场');
        if (!creep.pos.isNearTo(flag[0])) {
          creep.moveTo(flag[0]);
        }
      }
    }
  }
}
