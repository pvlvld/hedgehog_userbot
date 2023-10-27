type RAW_COMMANDS_ACTIONS = (typeof RAW_COMMANDS_ACTIONS)[number][0];

/** [Command: string, CooldownMinutes: number][] */
const RAW_COMMANDS_ACTIONS = [
  ['adventures', 167],
  ['read', 300],
  ['training', 120],
  ['update_level', 1440],
  ['garden', 1440],
] as const;
// ['atb', 1440],

export default RAW_COMMANDS_ACTIONS;
