function run(tower: StructureTower): void {


  const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (closestHostile) {
    tower.attack(closestHostile);
  }else {
    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.hits < structure.hitsMax&& structure.structureType != STRUCTURE_WALL

    });
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }
  }
}

export { run };
