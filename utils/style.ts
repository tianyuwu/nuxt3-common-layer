export function containSize(width: number, height: number, containerWidth: number, containerHeight: number) {
  const containerAspectRatio = containerWidth / containerHeight;
  const aspectRatio = width / height;
  if (aspectRatio > containerAspectRatio) {
    return {
      width: containerWidth,
      height: containerWidth / aspectRatio,
    };
  } else {
    return {
      width: containerHeight * aspectRatio,
      height: containerHeight,
    };
  }
}