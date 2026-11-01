/** Match CSS scene height without following Safari toolbar/keyboard changes. */
export function stableSceneHeight() {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;height:100lvh;width:0;top:0;left:0';
  document.documentElement.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  probe.remove();
  return height || window.innerHeight;
}
