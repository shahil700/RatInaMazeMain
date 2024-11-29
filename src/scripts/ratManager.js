export const RatManager = (() => {
  let position = { x: 0, y: 0 };

  const setPosition = (newPos) => {
    position = newPos;
  };

  const getPosition = () => {
    return position;
  };

  return { setPosition, getPosition };
})();
