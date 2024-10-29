export function getRandomColor(color = []) {
  const len = color.length;
  const randomIndex = Math.floor(Math.random() * len);
  return color[randomIndex];
}
