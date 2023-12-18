

// 定义Spawn类
export class MySpawn  {

  spawn:StructureSpawn;

  private maxHealth: number;
  private safeMode: boolean;

  constructor( spawn:StructureSpawn) {
    this.spawn=spawn;

    this.maxHealth = this.spawn.hitsMax; // 获取最大血量
    this.safeMode = false; // 初始化safeMode为false
  }

  // 检查血量并开启safe mode
  public  checkHealth() {
    if (this.spawn.hits < this.maxHealth && !this.safeMode) {
      this.safeMode = true; // 开启safe mode
      console.log("Spawn血量低于最大血量，已开启safe mode");
      // 在这里添加开启safe mode后的逻辑，比如恢复血量、提供护盾等
    } else if (this.spawn.hits >= this.maxHealth && this.safeMode) {
      this.safeMode = false; // 关闭safe mode
      console.log("Spawn血量已满，已关闭safe mode");
      // 在这里添加关闭safe mode后的逻辑，比如取消恢复、移除护盾等
    }
  }
}

