/* Render editable copy without a server or build step. */
const content = window.paperContent;
const fields = {
  'paper-title': 'title', authors: 'authors',
  tldr: 'tldr', 'abstract-text': 'abstract',
  'method-caption': 'methodCaption'
};
for (const [id, key] of Object.entries(fields)) {
  if (typeof content[key] === 'string') document.getElementById(id).textContent = content[key];
}
document.title = `DIG-HMR: ${content.title}`;
for (const kind of ['code']) {
  const url = content.links[kind];
  if (!url) continue;
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) continue;
    const link = document.getElementById(`${kind}-link`);
    link.href = parsed.href;
    link.removeAttribute('aria-disabled');
    link.querySelector('.soon')?.remove();
  } catch { /* Keep the placeholder until a complete URL is provided. */ }
}
const dialog = document.getElementById('figure-dialog');
const enlarged = document.getElementById('enlarged-figure');
document.querySelectorAll('[data-figure]').forEach(button => {
  button.addEventListener('click', () => {
    enlarged.src = button.dataset.figure;
    enlarged.alt = button.querySelector('img').alt;
    dialog.showModal();
  });
});
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
