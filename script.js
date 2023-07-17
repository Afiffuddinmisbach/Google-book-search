const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

searchBtn.addEventListener('click', searchBooks);

function searchBooks() {
    const searchTerm = searchInput.value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderResults(data);
        })
        .catch(error => {
            console.log('Terjadi kesalahan:', error);
        });
}
function renderResults(data) {
    resultsContainer.innerHTML = '';
  
    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const volumeInfo = item.volumeInfo;
  
        const card = document.createElement('div');
        card.classList.add('card');
  
        const image = document.createElement('img');
        image.classList.add('img-card');
        image.src = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'no-image.jpg';
        image.alt = volumeInfo.title;
        card.appendChild(image);
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-content');
  
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = volumeInfo.title;
        cardBody.appendChild(title);
  
        if (volumeInfo.authors) {
          const author = document.createElement('p');
          author.classList.add('penulis');
          author.textContent = 'Penulis: ' + volumeInfo.authors.join(', ');
          cardBody.appendChild(author);
        }
  
        const readLink = document.createElement('a');
        readLink.href = volumeInfo.previewLink;
        readLink.classList.add('btn', 'btn-link', 'btn-block');
        readLink.target = '_blank';
        readLink.textContent = 'Raead More';
        cardBody.appendChild(readLink);
  
        card.appendChild(cardBody);
  
        resultsContainer.appendChild(card);
      });
    } else {
      const noResults = document.createElement('p');
      noResults.textContent = 'Tidak ada hasil ditemukan.';
      resultsContainer.appendChild(noResults);
    }
  }
  
  