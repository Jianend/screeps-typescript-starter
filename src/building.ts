import {StructureSpawns} from "utils/prototype.spawn";

export class building {

  spawn: StructureSpawn;

  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }

  run(): void {

    this.build(this.spawn, STRUCTURE_EXTENSION);
    this.build(this.spawn, STRUCTURE_TOWER);

    if (!Memory.world) {
      Memory.world = {};
    }

    if (!Memory.world[this.spawn.room.name]) {
      Memory.world[this.spawn.room.name] = {};
    }
    if (Memory.world[this.spawn.room.name].SpawnLock==undefined) {
      Memory.world[this.spawn.room.name].SpawnLock = true;
    }


    if (Memory.world[this.spawn.room.name].SpawnLock) {
      this.creepGenerators(this.spawn);
    }
  }

  getRandomFreePos(startPos: RoomPosition, distance: number) {
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

  build(spawn: StructureSpawn, structureType: BuildableStructureConstant) {
    const structures = spawn.room.find(FIND_STRUCTURES, {filter: {structureType, my: true}});
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (let i = 0; i < CONTROLLER_STRUCTURES[structureType][spawn.room.controller!.level] - structures.length; i++) {
      this.getRandomFreePos(spawn.pos, 5).createConstructionSite(structureType);
    }
  }

  creepGenerators(spawn: StructureSpawn) {

    let StructureSpawn = new StructureSpawns(spawn);


    // var time = Game.time;
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && spawn.room == creep.room);
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && spawn.room == creep.room);
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && spawn.room == creep.room);
    let trucks = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck' && spawn.room == creep.room);
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && spawn.room == creep.room);


    let energy = spawn.room.energyCapacityAvailable;

    // 假设你已经创建了一个 StructureSpawn 类型的实例

    /**harvester   truck  10个 */


    if (!Memory.world[spawn.room.name].food) {
      Memory.world[spawn.room.name].food = 'Harvester';
    }
    if (!Memory.world[spawn.room.name].creepNum) {
      Memory.world[spawn.room.name].creepNum = 2;
    }
    let creep = Memory.world[spawn.room.name].creepNum


    // console.log(creep > trucks.length || creep > harvesters.length)


    if (creep > trucks.length || creep > harvesters.length) {
      if (Memory.world[spawn.room.name].food === 'Harvester') {
        if (harvesters.length < creep) {


          if (harvesters.length === 0) {
            console.log(harvesters.length + "" + spawn);

            let a: string | number | void;
            a = StructureSpawn.createHarvester(
              300)


            if (typeof a === "string") {
              console.log('Spawning new harvester: ');
              Memory.world[spawn.room.name].food = 'Truck';
            }


            // // 当harvester数量为0时，不论能量多少，都生产[WORK, CARRY, MOVE]
            // if (!spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}})) {
            //   console.log('Spawning new harvester with emergency configuration: ' + newName);
            //   Memory.world[spawn.room.name].food= 'Truck';
            // }
          } else {
            // 检查是否有足够的能量来生成creep
            if (energy >= 300) {


              let a: string | number | void;
              a = StructureSpawn.createHarvester(
                800)


              if (typeof a === "string") {
                console.log('Spawning new harvester: ');
                Memory.world[spawn.room.name].food = 'Truck';


              }
            }
          }
        } else {
          Memory.world[spawn.room.name].food = 'Truck';
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
              Memory.world[spawn.room.name].food = 'Harvester'


            }
          } else {
            // 检查是否有足够的能量来生成creep


            if (energy >= 100) {
              let a: string | number | void;
              a = StructureSpawn.createTruck(
                850, 'truck')

              if (typeof a === "string") {
                console.log('Spawning new truck: ');
                Memory.world[spawn.room.name].food = 'Harvester'


              }

              //    var a:string | number | void;

            }
          }

        } else {
          Memory.world[spawn.room.name].food = 'Harvester';
        }

      }

    }


    // harvester等于2的时候生产 upgrader
    if (trucks.length >= creep && upgraders.length < creep) {
      let a: string | number | void;


      a = StructureSpawn.createCustomCreep(
        500, 'upgrader')

      if (typeof a === "string") {
        console.log('Spawning new upgrader: ');
      }


    }

    if (spawn.room.find(FIND_CONSTRUCTION_SITES).length > creep) {
      // 生产builder
      if (builders.length < 0) {
        let a: string | number | void;


        a = StructureSpawn.createCustomCreep(
          500, 'builder')

        if (typeof a === "string") {
          console.log('Spawning new builder: ');
        }
      }
    }

    // console.log(upgraders.length>=2 )
    if (upgraders.length >= creep && repairers.length < creep) {
      //   console.log("repairers")
      let a: string | number | void;

      a = StructureSpawn.createCustomCreep(
        500, 'repairer')

      if (typeof a === "string") {
        console.log('Spawning new repairer: ');
      }
    }


  }

  public static WarSquad(Spawn: StructureSpawn, body: BodyPartConstant[]): number {


    let StructureSpawn = new StructureSpawns(Spawn);
    // let energy =300;
    let energy = Spawn.room.energyCapacityAvailable;


    let attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker' && Spawn.room == creep.room);
    let heals = _.filter(Game.creeps, (creep) => creep.memory.role == 'heal' && Spawn.room == creep.room);

    let num = 0;
    for (let bodyElement of body) {

      let a: string | number | void;


      switch (bodyElement) {
        case "attack": {

          if (attackers.length < 1) {
            a = StructureSpawn.createAttacker(energy);

            if (typeof a === "string") {
              console.log('Spawning new createAttacker: ');
              num++;
            }
          }
        }
        case "heal": {

          if (heals.length < 1) {

            a = StructureSpawn.createHeal(energy);
            // console.log(a+"hhhhhhhhh"+energy)
            if (typeof a === "string") {
              console.log('Spawning new createHeal: ');
              num++
            }

          }
        }
      }
    }

    if (!num) {

      return 0;

    } else {
      return -1;
    }


  }

}
