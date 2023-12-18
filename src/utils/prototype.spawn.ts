import {builder} from "../role/builder";

export {

  StructureSpawns


};

declare global {
  interface StructureSpawn {
    createCustomCreep(energy: number, roleName: string): string | number | void;

    createAttacker(energy: number): string | number | void;

    createHarvester(energy: number): string | number | void;

    createTruck(energy: number, role: string): string | number | void;

    createCreep(body: BodyPartConstant[], Name: string, options?: { role: string, working: boolean }): any;
  }
}

class StructureSpawns {


  spawn: StructureSpawn;

  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
    // super()
  }

  createCustomCreep(energy: number, roleName: string): string | number | void {
    const Name = roleName + Game.time;
    const numberOfParts = Math.floor(energy / 200);
    const body: BodyPartConstant[] = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    // spawn.spawnCreep(workerBody, `u2`, { memory: { role: "upgrader" } });

    return this.spawn.createCreep(body, Name, {role: roleName, working: false});

  };

  /**
   * 攻击代码
   * @param energy
   */
  createAttacker(energy: number): string | number {


    const body: BodyPartConstant[] = [];

    for (let i = 0; i < 10; i++) {
      body.push(TOUGH);
    }
    for (let i = 0; i < 10; i++) {
      body.push(MOVE);
    }
    energy = energy - 600;
    const numberOfParts = Math.floor(energy / 130);
    for (let i = 0; i < numberOfParts; i++) {
      body.push(ATTACK);

    }
    return this.spawn.createCreep(body, undefined, {role: 'attacker', working: false});

  }

  /**
   * 奶妈
   * @param energy
   */
  createHeal(energy: number): string | number {

    const body: BodyPartConstant[] = [];


    for (let i = 0; i < 5; i++) {
      body.push(TOUGH);
    }
    for (let i = 0; i < 11; i++) {
      body.push(MOVE);
    }
    energy = energy - 600;


    const numberOfParts = Math.floor(energy / 300);


    for (let i = 0; i < numberOfParts; i++) {
      body.push(HEAL);


    }

    return this.spawn.createCreep(body, undefined, {role: 'heal', working: false});

  }

  createHarvester(energy: number): string | number | void {
    const newName = 'Harvester' + Game.time;
    energy = energy - 100;
    if (energy < 200) {
      return;
    }
    const numberOfParts = Math.floor(energy / 100);
    const body: BodyPartConstant[] = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    body.push(MOVE);
    body.push(CARRY);


    return this.spawn.createCreep(body, newName, {role: 'harvester'});

  }

  createTruck(energy: number, role: string): string | number | void {


    const newName = 'Truck' + Game.time;
    const numberOfParts = Math.floor(energy / 100);
    const body: BodyPartConstant[] = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }

    return this.spawn.createCreep(body, newName, {role: role, transport: false});

  }

}


