const API_URL = 'https://fvgkwcvwqbdugexretbi.supabase.co/rest/v1/Articles';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Twój pełny klucz

async function fetchArticles() {
  const response = await fetch(API_URL, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${API_KEY}`
    }
  });
  const articles = await response.json();
  const container = document.getElementById('articlesContainer');
  container.innerHTML = '';

  articles.forEach(article => {
    const el = document.createElement('div');
    el.className = 'article';
    el.innerHTML = `
      <h2>${article.title}</h2>
      <h3>${article.subtitle}</h3>
      <p><strong>Autor:</strong> ${article.author}</p>
      <p><strong>Data:</strong> ${new Date(article.created_at).toLocaleString()}</p>
      <p>${article.content}</p>
    `;
    container.appendChild(el);
  });
}

async function NewArticle(title, subtitle, author, content) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': API_KEY,
      'Authorization': `Bearer ${API_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ title, subtitle, author, content })
  });

  if (!response.ok) {
    throw new Error('Nie udało się dodać artykułu');
  }

  return await response.json();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchArticles();

  document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    try {
      await NewArticle(title, subtitle, author, content);
      alert('Artykuł dodany!');
      e.target.reset();
      fetchArticles(); // odśwież listę
    } catch (err) {
      console.error(err);
      alert('Wystąpił błąd.');
    }
  });
});
