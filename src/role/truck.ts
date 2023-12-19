import {findNearestContainer} from "utils/findNearestContainer";
import {towerTruck} from "./towerTruck";

// const Colors = require("Colors");

// var Color = Colors.getRandomColor();
export var truck = {

  /** @param {Creep} creep **/
  run: function (creep: Creep) {


    if (creep.memory.transport && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
      creep.memory.transport = false;  // 变为 非building状态
      creep.say(' fetch');
    }
    if (!creep.memory.transport && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
      creep.memory.transport = true;  // 变为 building状态
      creep.say('transport');
    }
    if (Memory.world[creep.room.name].enemy) {
      towerTruck.run(creep)
    } else if (creep.memory.transport) {

      const tower = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.energy;
        }
      });
      var nearestower: Structure | null = findNearestContainer(creep, tower);
      const STORAGE = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });

      const target = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });


      if (target.length > 0) { // 需要维护的建筑数目 > 0
        if (creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target[0], {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 50});
        }
      } else if (tower.length > 0) {

        // var  Container:StructureContainer;
        if (nearestower !== null) {
          // 在这个代码块里，TypeScript 知道 container 不是 null，所以你可以安全地使用它的所有 StructureContainer 属性和方法。
          nearestower = nearestower as StructureContainer
        } else {
          return;
        }
        // 现在，energyNotFull数组包含了所有能量没有满的元素
        // 你可以对这个数组进行进一步的操作
        creepWithdrawAndDeposit(creep, nearestower);

      } else if (STORAGE.length > 0) {


        // let energyNotFull = containers.filter((element) => element.store.energy < element.store.getCapacity());
        let nearestContainer: Structure | null = findNearestContainer(creep, STORAGE);

        // var  Container:StructureContainer;
        if (nearestContainer !== null) {
          // 在这个代码块里，TypeScript 知道 container 不是 null，所以你可以安全地使用它的所有 StructureContainer 属性和方法。
          nearestContainer = nearestContainer as StructureContainer

        } else {

          return;
        }
        // 现在，energyNotFull数组包含了所有能量没有满的元素
        // 你可以对这个数组进行进一步的操作

        creepWithdrawAndDeposit(creep, nearestContainer);

      }

    } else {

      const energyOnGround = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (resource) => resource.resourceType === RESOURCE_ENERGY});

      if (energyOnGround.length > 0) {

        if (creep.pickup(energyOnGround[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(energyOnGround[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }


      }


    }
  }


};


function creepWithdrawAndDeposit(creep: Creep, containers: Structure) {


  // 将能量存放在 containers[0] 中
  if (creep.transfer(containers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(containers, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 50});
  }
  // 从 containers 中提取能量


}



