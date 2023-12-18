 export function findNearestContainer(creep: Creep, energyNotFull: Structure[]): Structure | null {
  if (energyNotFull.length === 0) {
    return null; // 提前返回，避免不必要的计算
  }

  let target = creep.pos;
  let nearestContainer: Structure | null = null;
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
