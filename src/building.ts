// import { spawn } from "child_process";
import {StructureSpawns} from "./utils/prototype.spawn";


var spawns: StructureSpawn;

function getRandomFreePos(startPos: RoomPosition, distance: number) {
  let x: number;
  let y: number;

  do {
    x = startPos.x + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
    y = startPos.y + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
  } while (
    (x + y) % 2 !== (startPos.x + startPos.y) % 2 ||
    Game.map.getRoomTerrain(startPos.roomName).get(x, y) === TERRAIN_MASK_WALL
    );
  return new RoomPosition(x, y, startPos.roomName);
}

function build(spawn: StructureSpawn, structureType: BuildableStructureConstant) {
  const structures = spawn.room.find(FIND_STRUCTURES, {filter: {structureType, my: true}});
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  for (let i = 0; i < CONTROLLER_STRUCTURES[structureType][spawn.room.controller!.level] - structures.length; i++) {
    getRandomFreePos(spawn.pos, 5).createConstructionSite(structureType);
  }
}

// function calcBodyCost(body: BodyPartConstant[]): number {
//     return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
// }

function run(spawn: StructureSpawn): void {
  spawns = spawn
  build(spawn, STRUCTURE_EXTENSION);
  build(spawn, STRUCTURE_TOWER);

  if (Memory.SpawnLock) {
    creepGenerators(spawn);

  }


}


function creepGenerators(spawn: StructureSpawn) {

  let StructureSpawn = new StructureSpawns(spawn);


  // var time = Game.time;
  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  let trucks = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck');
  let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');


  let energy = spawn.room.energyCapacityAvailable;

  // 假设你已经创建了一个 StructureSpawn 类型的实例

  /**harvester   truck  10个 */
  let creep = 3;


  if (!Memory.food) {
    Memory.food = 'Harvester';
  }


  // console.log(creep > trucks.length || creep > harvesters.length);


  if (creep > trucks.length || creep > harvesters.length) {
    if (Memory.food === 'Harvester') {
      if (harvesters.length < creep) {
        let newName = 'Harvester' + Game.time;


        if (harvesters.length === 0) {
          let a: string | number | void;
          a = StructureSpawn.createHarvester(
            200)


          if (typeof a === "string") {
            console.log('Spawning new harvester: ');
            Memory.food = 'Truck';


          }


          // 当harvester数量为0时，不论能量多少，都生产[WORK, CARRY, MOVE]
          if (!spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}})) {
            console.log('Spawning new harvester with emergency configuration: ' + newName);
            Memory.food = 'Truck';
          }
        } else {
          // 检查是否有足够的能量来生成creep
          if (energy >= 300) {

            let a: string | number | void;
            a = StructureSpawn.createHarvester(
              energy)


            if (typeof a === "string") {
              console.log('Spawning new harvester: ');
              Memory.food = 'Truck';


            }
          }
        }
      } else {
        Memory.food = 'Truck';
      }


    } else {

      if (trucks.length < creep) {
        // newName = 'Truck' + Game.time;
        if (trucks.length === 0) {
          let a: string | number | void;
          a = StructureSpawn.createTruck(
            100, 'truck')

          if (typeof a === "string") {
            console.log('Spawning new truck: ');
            Memory.food = 'Harvester'


          }
        } else {
          // 检查是否有足够的能量来生成creep


          if (energy >= 100) {
            let a: string | number | void;
            a = StructureSpawn.createTruck(
              energy, 'truck')

            if (typeof a === "string") {
              console.log('Spawning new truck: ');
              Memory.food = 'Harvester'
              console.log(a);

            }

            //    var a:string | number | void;

          }
        }

      } else {
        Memory.food = 'Harvester';
      }

    }

  }


  // harvester等于2的时候生产 upgrader
  if (trucks.length >= 2 && upgraders.length < 2) {
    let a: string | number | void;


    a = StructureSpawn.createCustomCreep(
      400, 'upgrader')

    if (typeof a === "string") {
      console.log('Spawning new upgrader: ');
    }


  }

  if (spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
    // 生产builder
    if (builders.length < 2) {
      let a: string | number | void;


      a = StructureSpawn.createCustomCreep(
        400, 'builder')

      if (typeof a === "string") {
        console.log('Spawning new builder: ');
      }
    }
  }


  if (upgraders.length < 2 && repairers.length < 2) {
    let a: string | number | void;

    a = StructureSpawn.createCustomCreep(
      400, 'repairer')

    if (typeof a === "string") {
      console.log('Spawning new repairer: ');
    }
  }


}

export function WarSquad(body: BodyPartConstant[]) {

  let StructureSpawn = new StructureSpawns(spawns);


  let attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
  let heals = _.filter(Game.creeps, (creep) => creep.memory.role == 'heal');


  for (let bodyElement of body) {


    switch (bodyElement) {
      case "attack": {

        if (attackers.length < 1) {
          StructureSpawn.createAttacker(130);
        }
      }
      case "heal": {

        if (heals.length < 1) {
          StructureSpawn.createHeal(300);

        }
      }
    }
  }

}


export {run};
