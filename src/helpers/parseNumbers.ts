const numberRegExp = RegExp(/\d+/, 'g');

function parseNumbers(string: string): number[] {
  return (string.match(numberRegExp) as number[] | null) ?? ([] as number[]);
}

export default parseNumbers;
