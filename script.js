
let currentPage = 1;
const emperorsPerPage = 4;
let emperorsData = [];

fetch('data/emperors.json')
  .then(response => response.json())
  .then(data => {
    emperorsData = data;
    renderPage(currentPage);
  });

function renderPage(page) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  const start = (page - 1) * emperorsPerPage;
  const end = start + emperorsPerPage;
  const emperorsToShow = emperorsData.slice(start, end);

  emperorsToShow.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="images/${emp.image}" alt="${emp.name}" onclick="toggleDetails('${emp.name}')">
      <h3>${emp.name}</h3>
      <div class="details" id="details-${emp.name}">${emp.deeds}</div>
    `;

    gallery.appendChild(card);
  });

  document.getElementById('prevBtn').disabled = page === 1;
  document.getElementById('nextBtn').disabled = end >= emperorsData.length;
}

function toggleDetails(name) {
  const detail = document.getElementById(`details-${name}`);
  detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const maxPage = Math.ceil(emperorsData.length / emperorsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderPage(currentPage);
  }
});
