export default function makeClass(target: { [key: string]: string | number | boolean }) {
  let result = "";

  for (const [key, value] of Object.entries(target)) {
    if (value) {
      result += ` ${key}`;
    }
  }

  return result;
}
