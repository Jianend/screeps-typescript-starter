

/**
 * 升级者。
 *
 * 当把 creep 的 `role` 设置为 `"upgrader"` 时，creep 在每个 tick 会执行 `roleUpgrader.run` 代码。
 *
 * ```ts
 * Game.creeps['name'].memory.role = 'upgrader';
 * ```
 *
 * creep 会找到控制器 (room controller) 并进行升级。当 creep 在携带的能量（energy）变为 0 时去采集能量，并在采集到足够能量之后回到控制器附近继续升级。
 */
export const roleUpgrader = {
    run(creep: Creep): void {
      // 如果当前 creep 正在升级但是没有能量了，则让此 creep 去采集能量
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say("🔄 采集");
      }

      // 如果当前 creep 不处于升级模式，并且能量已经存满，则让此 creep 去升级
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say("⚡ 升级");
      }

      if (creep.memory.upgrading) {
        if (creep.room.controller == null) {
          console.log("房间 %s 中没有控制器", creep.room.name);
        } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } ,reusePath:50});
        }
      } else {
        const currentRoom = creep.room;
        const containers:StructureContainer[] = currentRoom.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
        const energyOnGround = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => resource.resourceType === RESOURCE_ENERGY });



        if (containers.length > 0) {
            const energyNotFull: StructureContainer[] = containers.filter(
                (container) => container.store.energy >0
            );

            // let energyNotFull = containers.filter(element => element.store.energy > 0);

            var nearestContainer = findNearestContainer(creep, energyNotFull);


            if (nearestContainer !== null) {
                // 在这个代码块里，TypeScript 知道 container 不是 null，所以你可以安全地使用它的所有 StructureContainer 属性和方法。
                nearestContainer = nearestContainer as StructureContainer

            } else {

                return;
            }
            // 现在，energyNotFull数组包含了所有能量没有满的元素
            // 你可以对这个数组进行进一步的操作
            creepWithdrawAndDeposit(creep, nearestContainer);



        } else if (energyOnGround.length > 0) {

            const energy = energyOnGround[0];
            const result = creep.pickup(energy);


            creep.moveTo(energy.pos.x, energy.pos.y);

        }
   }
    }
  };


function findNearestContainer(creep: Creep, energyNotFull: StructureContainer[]) {
    let target = creep.pos;
    let nearestContainer = null;
    let nearestDistance = Infinity;

    for (let container of energyNotFull) {
        let containerPos = container.pos;
        let distance = Math.abs(target.x - containerPos.x) + Math.abs(target.y - containerPos.y);

        if (distance < nearestDistance) {
            nearestContainer = container;
            nearestDistance = distance;
        }
    }

    return nearestContainer;
}

function creepWithdrawAndDeposit(creep: Creep, container: StructureContainer) {
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container, { visualizePathStyle: { stroke: 'ffffff' } ,reusePath:50});
    }
}

