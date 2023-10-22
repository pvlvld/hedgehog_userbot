const numberRegExp = RegExp(/\d+/, 'g');

function parseNumbers(string: string) {
  return string.match(numberRegExp)?.map((v) => Number(v));
}

export default parseNumbers;
