

export  class Warrior  {
  public creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;

  }

  public  static run(creep:Creep) {
    // 如果creep的生命值低于一定阈值，寻找并移动到医疗站点进行治疗


    // 否则，寻找并攻击敌人
    const targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length > 0) {
      const target = creep.pos.findClosestByRange(targets);
      if (target) {
        creep.attack(target);
      }
    } else {
      // 如果没有敌人，移动到房间的中心点等待敌人出现

    }
  }
}
