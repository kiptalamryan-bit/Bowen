const sidebar = document.querySelector('#sidebar');
const toast = document.querySelector('#toast');
const toastText = document.querySelector('#toastText');
const paymentModal = document.querySelector('#paymentModal');
let toastTimer;

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.querySelector('#openSidebar').addEventListener('click', () => sidebar.classList.add('open'));
document.querySelector('#closeSidebar').addEventListener('click', () => sidebar.classList.remove('open'));
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach((link) => link.classList.remove('active'));
  item.classList.add('active');
  document.querySelector('#pageTitle').textContent = item.textContent.trim().replace(/\s+\d+$/, '');
  sidebar.classList.remove('open');
  if (item.dataset.section !== 'overview') showToast(`${item.textContent.trim()} view is ready for your data`);
}));

document.querySelector('#exportButton').addEventListener('click', () => showToast('Export ready to download'));
document.querySelector('#filterButton').addEventListener('click', () => showToast('Filters opened — 2 active'));
document.querySelector('#searchButton').addEventListener('click', () => showToast('Search is ready'));
document.querySelectorAll('.period').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.period').forEach((period) => period.classList.remove('active'));
  button.classList.add('active');
  showToast(`Revenue view updated to ${button.textContent}`);
}));

document.querySelector('#newPayment').addEventListener('click', () => paymentModal.classList.add('open'));
document.querySelector('#closeModal').addEventListener('click', () => paymentModal.classList.remove('open'));
paymentModal.addEventListener('click', (event) => { if (event.target === paymentModal) paymentModal.classList.remove('open'); });
document.querySelector('#createPayment').addEventListener('click', () => {
  paymentModal.classList.remove('open');
  showToast('Payment link created successfully');
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    showToast('Search is ready');
  }
  if (event.key === 'Escape') paymentModal.classList.remove('open');
});
