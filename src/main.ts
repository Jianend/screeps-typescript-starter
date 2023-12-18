// import { StructureSpawn } from "screeps";
import { warController } from "mod/createWarControllerStartWar";

import {building} from "./building";

import * as tower from "tower";

import { builder } from "role/builder";
import { Harvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
import { truck } from "role/truck";
import { repairer } from "role/repairer";
import { Warrior } from "role/warrior";
import { Healer } from "role/wetNurse";
import { MySpawn } from "utils/safeMode";



export const loop = function (): void {



  const allTowers: StructureTower[] = [];

    for (let spawn in Game.spawns) {
      const 治疗攻击二人小队 = [ATTACK, HEAL];
    //   warController.addSquad(Game.spawns[spawn],治疗攻击二人小队);


      let buildClass = new building(Game.spawns[spawn]);
      buildClass.run();
        let mySpawn = new MySpawn(Game.spawns[spawn]);
        mySpawn.checkHealth();//开启安全模式

      const spawns = Game.spawns[spawn];
      const towersInRoom = spawns.room.find<StructureTower>(FIND_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER, my: true }
      });
      allTowers.push(...towersInRoom);
    }
    allTowers.forEach(tower.run);//塔
    // const towers = Game.spawns.Spawn1.room.find<StructureTower>(FIND_STRUCTURES, {
    //     filter: { structureType: STRUCTURE_TOWER, my: true }
    // });


  for (const roomName in Game.rooms) {
    getRoomResources(roomName)

  }

    // 根据 screep 的角色分配不同的任务
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === "harvester") {
            if (!creep.memory.sources) {
                // console.log("a");
                creep.memory.sources = getMinimumNumTerrain(creep);
            }
            Harvester.run(creep);
        }
        if (creep.memory.role === "upgrader") {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role === "builder") {
            builder.run(creep);
        }
        if (creep.memory.role === "truck") {
            truck.run(creep);
        }
        if (creep.memory.role === "repairer") {
            repairer.run(creep);
        }
        if (creep.memory.role === 'attacker') {
            Warrior.run(creep)
        }
        if (creep.memory.role === 'heal') {
            Healer.run(creep)
        }
    }

    // 删除 Memory 中已经死亡的 creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }
};


function getRoomResources(roomName: string) {
    if (Game.time % 20 === 0) {
        let room = Game.rooms[roomName];
        const resources = room.find(FIND_SOURCES);
        count = 0;
        let terrainData = [];
        console.log("========================");
        for (const resource in resources) {
            var count = 0;

            for (var creepName in Game.creeps) {
                var creep = Game.creeps[creepName];
                if (creep.memory && creep.memory.sources && creep.memory.sources.resources && creep.memory.sources.resources.id === resources[resource].id) {
                    count++;
                }
            }
            terrainData.push({
                resources: resources[resource],
                num: count
            })


            console.log(resources[resource].id + "=" + count);

        }

        if (!Memory.roomResources[roomName]) {
            Memory.roomResources[roomName] = {}

        }


        Memory.roomResources[roomName] = terrainData;


    }
}

function getMinimumNumTerrain(creep: Creep) {


    let minTerrain = Memory.roomResources[creep.room.name][0]; // 假设第一个对象具有最小的num值
    for (const key in Memory.roomResources[creep.room.name]) {


        if (Memory.roomResources[creep.room.name][key].num < minTerrain.num) {
            minTerrain = Memory.roomResources[creep.room.name][key];
        }


    }


    return minTerrain;
}

