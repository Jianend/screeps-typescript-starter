class WarControllerContexter implements WarControllerContext {
  addBoostTask(): number {
    return 0;
  }

  boostCreep(creep: Creep): boolean {
    return false;
  }

  finishBoost(): void {
  }

  getBoostState(): boolean {
    return false;
  }

  // getMemory(): Memory {
  //   let memory: Memory;
  //   return memory;
  // }

  getRoomManager(): Creep[] {
    return _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' || creep.memory.role == 'truck');
  }

  lendSpawn(): boolean {

    Memory.SpawnLock = true;

    return true;
  }

  remandSpawn(): void {
    Memory.SpawnLock = false;
  }

}
