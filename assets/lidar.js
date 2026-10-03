/* Illustrative distance graph, deliberately separate from the reference script. */
(() => {
  const demo = document.querySelector('[data-lidar]');
  if (!demo) return;
  const svg = demo.querySelector('svg');
  const nodes = [...svg.querySelectorAll('.lidar-points circle')].map(c => ({x: +c.getAttribute('cx'), y: +c.getAttribute('cy')}));
  const edges = svg.querySelector('.lidar-edges');
  const lanes = svg.querySelector('.lidar-lanes');
  const radius = demo.querySelector('input');
  const buttons = [...demo.querySelectorAll('[data-layer]')];
  let layer = 'lanes';
  const element = (tag, attributes) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  function render() {
    const limit = +radius.value;
    demo.querySelector('output').value = limit;
    edges.replaceChildren();
    lanes.replaceChildren();
    const incoming = nodes.map(() => []);
    let count = 0;
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      const forward = a.y - b.y;
      const distance = Math.hypot(a.x - b.x, forward);
      if (forward >= 10 && forward <= 65 && distance <= limit) {
        incoming[j].push({from:i, cost:distance + Math.abs(a.x - b.x) * 2});
        edges.append(element('line', {x1:a.x,y1:a.y,x2:b.x,y2:b.y}));
        count++;
      }
    }));
    // Shortest paths from the two near-field boundary seeds, in forward order.
    const order = nodes.map((_, i) => i).sort((i,j) => nodes[j].y - nodes[i].y);
    let connected = 0;
    [0,17].forEach(start => {
      const cost = nodes.map(() => Infinity), previous = nodes.map(() => -1);
      cost[start] = 0;
      order.forEach(j => incoming[j].forEach(edge => {
        const next = cost[edge.from] + edge.cost;
        if (next < cost[j]) {cost[j] = next; previous[j] = edge.from;}
      }));
      const targets = order.filter(i => nodes[i].y <= 70 && Number.isFinite(cost[i]));
      if (!targets.length) return;
      const target = targets.reduce((a,b) => cost[a] < cost[b] ? a : b);
      const path = [];
      for (let i = target; i !== -1; i = previous[i]) path.push(`${nodes[i].x},${nodes[i].y}`);
      lanes.append(element('polyline', {points:path.reverse().join(' ')}));
      connected++;
    });
    edges.style.display = layer === 'returns' ? 'none' : '';
    lanes.style.display = layer === 'lanes' ? '' : 'none';
    demo.querySelector('.lidar-status').textContent = layer === 'returns'
      ? `${nodes.length} illustrative returns. Choose Graph to reveal local connections.`
      : `${count} graph connections · ${connected} of 2 paths reach the far field. ${connected < 2 ? 'Increase the radius to reconnect the boundaries.' : 'Adjust the radius to explore connectivity.'}`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.layer === layer)));
  }
  buttons.forEach(button => button.addEventListener('click', () => {layer = button.dataset.layer;render();}));
  radius.addEventListener('input', render);
  render();
  demo.querySelector('.lidar-controls').hidden = false;
})();
