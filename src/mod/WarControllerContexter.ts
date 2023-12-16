



/**
 * 战争模块的依赖项
 */
interface WarControllerContext {
    /**
     * 获取战争模块存储信息
     * 函数，调用后返回内存对象
     */
    // getMemory: () => Memory
    /**
     * 锁定一个房间的 spawn
     * 调用该方法后该房间的 spawn 不应执行任何其他操作
     * 若无法锁定可以返回 false
     */
    lendSpawn: () => boolean
    /**
     * 归还一个房间的 spawn
     */
    remandSpawn: () => void
    /**
     * 获取一个房间的运营单位
     * 调用后返回当前正在执行运维任务的 creep 数组
     */
    getRoomManager: () => Creep[]
    /**
     * 添加一个 boost 任务
     * 应返回该任务的唯一索引
     */
    addBoostTask: () => number
    /**
     * 获取 boost 任务的状态
     */
    getBoostState: () => boolean
    /**
     * 让一个 creep 按照指定 boost 任务进行强化
     * 函数应返回是否强化成功
     */
    boostCreep: (creep: Creep) => boolean
    /**
     * 结束 boost 任务
     */
    finishBoost: () => void
  }


export  class  WarControllerContexter implements WarControllerContext {

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

  static getRoomManager(): Creep[] {
    return _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' || creep.memory.role == 'truck');
  }
  static lendSpawn() {
    Memory.SpawnLock = true;

    return true;

  }

  static remandSpawn() {
    Memory.SpawnLock = false;

  }
}
