interface CreepMemory {
  /**
   * 该 creep 的角色
   */
  role?: string;


  /**
   * creep 内存
   */

  memory?: any;


  /**
   * 该creep 分配sources
   */

  sources?: any;

  // room?:any;

  working?: boolean;


  // role?: string;
  room?: string;
  /** 是否正在建造 */
  building?: boolean;
  /** 是否正在升级 */
  upgrading?: boolean;

  /**是否在修复 */
  repairer?: boolean;
  /**是否在运输 */
  transport?: boolean;


}

interface Memory {
  roomResources?: any;
  food?: string;
  /**
   * 是否锁 spawn
   */
  SpawnLock?: boolean;

}

