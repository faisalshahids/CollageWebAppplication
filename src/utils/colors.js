export const darkColors = [
  '#1a1a1a', '#2c3e50', '#34495e', '#2c3e50', '#273c75',
  '#192a56', '#353b48', '#2f3640', '#130f40', '#30336b'
];

export const getRandomColor = () => {
  return darkColors[Math.floor(Math.random() * darkColors.length)];
};