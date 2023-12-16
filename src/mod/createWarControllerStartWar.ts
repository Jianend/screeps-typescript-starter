import { WarControllerContexter } from "./WarControllerContexter";
import {} from "./createWarController";



import { WarSquad } from "building";

// const warControllerContexter = new WarControllerContexter();
const warController = createWarController({
    getMemory: () => {
        if (!Memory.wars) Memory.wars = {}
        return Memory.wars
    },
    lendSpawn: WarControllerContexter.lendSpawn,
    remandSpawn: WarControllerContexter.remandSpawn,
    getRoomManager: WarControllerContexter.getRoomManager,
    WarSquad: WarSquad


}
)

// 导出出去，这样就可以供其他模块使用
export { warController }

