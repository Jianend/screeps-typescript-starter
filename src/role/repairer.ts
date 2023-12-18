// var builder = require('builder');
import { builder } from "./builder";

   export var repairer = {
    // a function to run the logic for this role
    run: function (creep:Creep) {
        if (!creep.memory.repairer) {
            creep.memory.repairer = false;
        }

        if (creep.memory.repairer && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairer = false;
            creep.say('🔄 repairer');

        }
        if (!creep.memory.repairer && creep.store.getFreeCapacity() == 0) {  // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.repairer = true;
            creep.say('⚡ repairer');
        }


        if ((creep.memory.repairer)) {

            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                // filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                filter: (s) => s.hits < s.hitsMax

            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }else{
                builder.run(creep)
            }
            // if we can't fine on
        }
        // if creep is supposed to harvest energy from source
        else {




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


function findNearestContainer(creep: Creep, energyNotFull: StructureContainer[]): StructureContainer | null {
    if (energyNotFull.length === 0) {
        return null; // 提前返回，避免不必要的计算
    }

    let target = creep.pos;
    let nearestContainer: StructureContainer | null = null;
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


function creepWithdrawAndDeposit(creep: Creep, containers: StructureContainer) {




    // 从 containers 中提取能量
    if (creep.withdraw(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containers, { visualizePathStyle: { stroke: '#ffffff' } });
    }


}
