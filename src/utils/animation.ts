export function TitleAnimation(axis: string, custom: number = 0) {
  return {
    hidden: {
      [axis]: -100,
      opacity: 0,
    },
    visible: {
      [axis]: 0,
      opacity: 1,
      transition: { delay: custom, duration: 0.4 },
    },
  };
}
