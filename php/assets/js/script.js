// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('approvalModal');
  const approveYes = document.getElementById('approveYes');
  const approveNo = document.getElementById('approveNo');
  const getUpdates = document.getElementById('get-updates');

  if (!localStorage.getItem('trh_approval')) {
    setTimeout(() => { modal.classList.remove('hidden'); }, 1500);
  }

  getUpdates?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  approveYes?.addEventListener('click', () => {
    fetch('api_listings.php') // example: we could call backend to log approval
      .then(()=> {
        localStorage.setItem('trh_approval', 'yes');
        alert('Thank you — we will send you details.');
        modal.classList.add('hidden');
      });
  });

  approveNo?.addEventListener('click', () => {
    localStorage.setItem('trh_approval', 'no');
    modal.classList.add('hidden');
  });
});
