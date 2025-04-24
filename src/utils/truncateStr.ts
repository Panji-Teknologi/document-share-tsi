function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.toString().slice(0, num) + '...';
}

export default truncateString;
