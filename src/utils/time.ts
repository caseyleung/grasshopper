export const getTime = () => {
  let hours = new Date().getHours();

  if (hours < 6) return "凌晨";
  if (hours < 12) return "早上";
  if (hours < 18) return "下午";
  return "晚上";
};
