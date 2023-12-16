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
    createCreep(body: BodyPartConstant[], Name: string, options?: {role: string, working: boolean}): any;
  }
}

class StructureSpawns   {



    spawn:StructureSpawn;

    constructor(spawn:StructureSpawn,body?:BodyPartConstant[]) {
        this.spawn=spawn;
      if (body != null&&builder!=undefined) {
        for (let bodyElement of body) {

          switch (bodyElement) {
            case "attack":
              this.createAttacker(130);
            case "heal":
              this.createHeal(300);
          }
        }

      }


        // super()
    }
    createCustomCreep(energy:number,roleName:string):string|number|void{
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

        return this.spawn.createCreep(body, Name, { role: roleName, working: false });

    };

  /**
   * 攻击代码
   * @param energy
   */
  createAttacker(energy: number): string | number  {

        const numberOfParts = Math.floor(energy / 130);
        const body: BodyPartConstant[] = [];
        for (let i = 0; i < numberOfParts; i++) {
          body.push(ATTACK);
          body.push(MOVE);
        }
        return this.spawn.createCreep(body, undefined, { role: 'attacker', working: false });

    }

  /**
   * 奶妈
   * @param energy
   */
  createHeal(energy: number): string | number  {

    const numberOfParts = Math.floor(energy / 130);
    const body: BodyPartConstant[] = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(HEAL);
      body.push(MOVE);
    }
    return this.spawn.createCreep(body, undefined, { role: 'heal', working: false });

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

        return this.spawn.createCreep(body, newName, { role: 'harvester' });

    }
    createTruck(energy: number, role: string): string | number | void{


        const newName = 'Truck' + Game.time;
        const numberOfParts = Math.floor(energy / 100);
        const body: BodyPartConstant[] = [];
        for (let i = 0; i < numberOfParts; i++) {
          body.push(MOVE);
        }
        for (let i = 0; i < numberOfParts; i++) {
          body.push(CARRY);
        }

        return this.spawn.createCreep(body, newName, { role:role, transport: false });

    }

}


