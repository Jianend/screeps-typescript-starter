
// import { StructureSpawn } from "screeps";

import * as building from "building";
import * as tower from "tower";

import { builder } from "role/builder";
import { Harvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
import { truck } from "role/truck";
import { repairer } from "role/repairer";


export const loop = function (): void {
    building.run(Game.spawns.Spawn1);
    for (const roomName in Game.rooms) {
        getRoomResources(roomName)

    }

    const towers = Game.spawns.Spawn1.room.find<StructureTower>(FIND_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER, my: true }
    });
    towers.forEach(tower.run);

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
    // console.log(roomName);
    if (Game.time % 20 === 0) {
        let room = Game.rooms[roomName];
        // let reSources = room.find(FIND_SOURCES);
        // let resources = reSources.filter(element => element.store.energy != 0);


        // const room = Game.rooms['YourRoomName']; // 将 'YourRoomName' 替换为您的房间名称

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

        if (!Memory.roomResources[roomName] ) {
            Memory.roomResources[roomName] ={}

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

