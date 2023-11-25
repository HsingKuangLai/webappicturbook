function storeAndNavigate() {
    const idValue = document.getElementById('id').value;
    localStorage.setItem('storedId', idValue);
    window.location.href = 'nextpage.html';
  }