function run(tower: StructureTower): void {


  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    if (!Memory.world[tower.room.name].enemy) {
      Memory.world[tower.room.name].enemy=closestHostile.id
    }
    tower.attack(closestHostile);
  }else {
    if (Memory.world[tower.room.name].enemy) {
      delete Memory.world[tower.room.name].enemy
    }
    // const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //   filter: structure => structure.hits < structure.hitsMax&& structure.structureType != STRUCTURE_WALL

    // });
    // if (closestDamagedStructure) {
    //   tower.repair(closestDamagedStructure);
    // }
  }
}

export { run };
