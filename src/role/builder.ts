
// var repairer = require("repairer");


export var builder = {
    /** @param {Creep} creep **/
    run: function (creep: Creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 运输');

        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.building = true;
            creep.say('⚡ 建造');
        }



        if (creep.memory.building) {
            // 在 creep 所在房间中找到所有的建筑工地
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (targets.length) {

                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {


                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
                }
            }
        } else {



            // var containers = creep.memory.containers.container;
            // var container = Game.getObjectById(containers.id);
            const currentRoom = creep.room;
            // const containers: StructureContainer[] = currentRoom.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } });
            var containers = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER ) &&
                    structure.store.energy >0;
                }
            });





            const energyOnGround = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => resource.resourceType === RESOURCE_ENERGY });


            if (containers.length > 0) {


                var nearestContainer = findNearestContainer(creep, containers);


                if (nearestContainer !== null) {
                    // 在这个代码块里，TypeScript 知道 container 不是 null，所以你可以安全地使用它的所有 StructureContainer 属性和方法。
                    nearestContainer = nearestContainer as StructureContainer

                } else {
                    // console.log("容器是 null!");
                    // 处理 null 的情况...
                    return;
                }


                // 现在，energyNotFull数组包含了所有能量没有满的元素
                // 你可以对这个数组进行进一步的操作
                creepWithdrawAndDeposit(creep, nearestContainer);

            } else if (energyOnGround.length > 0) {

                const energy = energyOnGround[0];
                const result = creep.pickup(energy);
                // console.log(result);
                // console.log(energy.pos);

                creep.moveTo(energy.pos.x, energy.pos.y);
                // console.log('yyyyyy');

            }



        }
    }
};


function findNearestContainer(creep: Creep, energyNotFull: Structure[]): Structure | null {
    if (energyNotFull.length === 0) {
        return null; // 提前返回，避免不必要的计算
    }

    let target = creep.pos;
    let nearestContainer: Structure | null = null;
    let nearestDistance = Infinity;

    for (let container of energyNotFull) {
        let containerPos = container.pos;
        // 你可以考虑使用 Pathfinder.search 来获取更准确的距离，但以下的方法对于简单的场景应该足够了。
        let distance = Math.abs(target.x - containerPos.x) + Math.abs(target.y - containerPos.y);

        if (distance < nearestDistance) {
            nearestContainer = container;
            nearestDistance = distance;
        }
    }

    return nearestContainer;
}

function creepWithdrawAndDeposit(creep: Creep, containers: Structure) {




    // 从 containers 中提取能量
    if (creep.withdraw(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containers, { visualizePathStyle: { stroke: '#ffffff' } });
    }


}

