
import {findNearestContainer} from "utils/findNearestContainer";

// const Colors = require("Colors");

// var Color = Colors.getRandomColor();
export var  towerTruck = {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {





    //   console.log(containers+" "+creep.name)



        if (creep.memory.transport && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
            creep.memory.transport = false;  // 变为 非building状态
            creep.say(' fetch');
        }
        if (!creep.memory.transport && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
            creep.memory.transport = true;  // 变为 building状态
            creep.say('transport');
        }
        if (creep.memory.transport) {
            const tower = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER );
                }
            });
                if (tower.length > 0) {
                    creepWithdrawAndDeposit(creep, tower[0]);

                }


            }
        else {


            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.energy > 0;
                }
            });

            let energyOnGround = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => resource.resourceType === RESOURCE_ENERGY });

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
                creepWithdrawAndDeposita(creep, nearestContainer);

            } else if (energyOnGround) {
                if (energyOnGround.length > 0) {



                    if (creep.pickup(energyOnGround[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(energyOnGround[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }

            }




            // const energyOnGround = creep.room.find(FIND_DROPPED_RESOURCES, { filter: (resource) => resource.resourceType === RESOURCE_ENERGY });
            //
            // if (energyOnGround.length > 0) {
            //
            //   if (creep.pickup(energyOnGround[0]) === ERR_NOT_IN_RANGE) {
            //     creep.moveTo(energyOnGround[0], { visualizePathStyle: { stroke: '#ffffff' } });
            //   }
            //
            //
            //
            // }



        }
    }


};






function creepWithdrawAndDeposit(creep: Creep, containers: Structure) {


    // 将能量存放在 containers[0] 中
    if (creep.transfer(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containers, { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 50 });
    }
    // 从 containers 中提取能量


}

function creepWithdrawAndDeposita(creep: Creep, containers: Structure) {
    // 从 containers 中提取能量
    if (creep.withdraw(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containers, { visualizePathStyle: { stroke: '#ffffff' } });
    }


}



