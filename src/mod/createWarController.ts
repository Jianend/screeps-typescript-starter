

// 创建战争模块

export const createWarController = function (context: any) {


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
