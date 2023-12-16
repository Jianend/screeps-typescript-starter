// import { WarControllerContexter } from "./WarControllerContexter";


// 引入模块创建器
import {createWarController} from "./createWarController";

// const createWarController = require('./createWarController')
// 引入其他依赖
import {WarControllerContexter} from "./WarControllerContexter";
// const WarControllerContexter = require('./WarControllerContexter')
import { WarSquad } from "building";


// 实例化战争模块
const warController = createWarController({
  getMemory: () => {
    if (!Memory.wars) Memory.wars = {}
    return Memory.wars
  },
    lendSpawn: WarControllerContexter.lendSpawn,
    remandSpawn: WarControllerContexter.remandSpawn,
    getRoomManager: WarControllerContexter.getRoomManager,
    WarSquad: WarSquad
});


// // 导出出去，这样就可以供其他模块使用
export { warController }

// 导出出去，这样就可以供其他模块使用
// export = warController
