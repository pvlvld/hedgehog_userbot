type RAW_COMMANDS_ACTIONS = (typeof RAW_COMMANDS_ACTIONS)[number][0];

/** [Command: string, CooldownMinutes: number][] */
const RAW_COMMANDS_ACTIONS = [
  ['adventures', 167],
  ['read', 300],
  ['training', 100],
  // ['atb', 1440],
  ['update_level', 1440],
  ['garden', 1440],
] as const;
// ['garden', 0],
// ['my_garden', 0],

export default RAW_COMMANDS_ACTIONS;
