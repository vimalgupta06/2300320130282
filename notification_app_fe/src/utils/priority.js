const WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export function getPriorityNotifications(notifications, limit) {
  return [...notifications]
    .sort((a, b) => {
      const weightDiff = WEIGHT[b.Type] - WEIGHT[a.Type];

      if (weightDiff !== 0) {
        return weightDiff;
      }

      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, limit);
}