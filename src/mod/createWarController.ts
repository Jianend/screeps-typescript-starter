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


// 创建战争模块
const createWarController = function (context: any) {


  /**
   * lendSpawn  锁定spawn
   * remandSpawn  归还一个房间的 spawn
   * getRoomManager 获取一个房间的运营单位
   * WarSquad  建造 小队
   */
  const {lendSpawn, remandSpawn, getRoomManager,WarSquad} = context

  /**
   * 小队配置
   */
  const 治疗攻击二人小队 = [ATTACK, HEAL];
  /**
   * 启动战争
   * 初始化
   * 添加一个 boost 任务
   * 获取战争模块存储信息
   * 锁定一个房间的 spawn
   * 发布一个小队
   *
   */
  const startWar = function () {



    //  发布小队
    // addSquad(治疗攻击二人小队);


  }
  /**
   * 结束战争
   * 归还一个房间的 spawn
   * 战争模块存储信息 清除
   */
  const endWar = function () {
  }
  /**
   * 发布一个小队
   * 应该传入一个小队类型，拿着这个小队类型去配置身体部件和强化资源
   */
  const addSquad = function (小队部件: BodyPartConstant[]) {
    const managers = getRoomManager()
    if (managers.length > 0) lendSpawn();
    else remandSpawn();
    if ( Memory.SpawnLock) {
      // console.log("已锁定spawn 开始");
      WarSquad(小队部件);
    }


  }
  /**
   * 查看当前战争状态
   */
  const show = function () {
  }
  /**
   * 执行 tick 逻辑
   * 启动战争
   * 执行任务
   */
  const run = function () {

    startWar();

  }

  return {startWar, endWar, addSquad, show, run}
}
