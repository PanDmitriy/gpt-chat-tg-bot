export function isCommand(text: string, command: string): boolean {
  return text === `/${command}`;
}
