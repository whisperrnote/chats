export function fadeIn(node: HTMLElement, duration = 200) {
  node.style.opacity = '0';
  node.style.transition = `opacity ${duration}ms`;
  requestAnimationFrame(() => {
    node.style.opacity = '1';
  });
}

export function fadeOut(node: HTMLElement, duration = 200) {
  node.style.opacity = '1';
  node.style.transition = `opacity ${duration}ms`;
  requestAnimationFrame(() => {
    node.style.opacity = '0';
  });
}
