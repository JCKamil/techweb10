const API_URL = 'https://fvgkwcvwqbdugexretbi.supabase.co/rest/v1/Articles';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA';

async function fetchArticles() {
  const response = await fetch(API_URL, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const articles = await response.json();
  const container = document.getElementById('articlesContainer');
  container.innerHTML = '';

  articles.forEach(article => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h3>${article.title}</h3>
      <h4>${article.subtitle}</h4>
      <p><strong>Autor:</strong> ${article.author}</p>
      <p><strong>Data:</strong> ${new Date(article.created_at).toLocaleDateString()}</p>
      <p>${article.content}</p>
      <hr/>
    `;
    container.appendChild(element);
  });
}

async function createArticle(title, subtitle, author, content) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ title, subtitle, author, content }]),
  });

  if (!response.ok) throw new Error('Błąd dodawania artykułu');
  return response.json();
}

document.getElementById('articleForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;

  try {
    await createArticle(title, subtitle, author, content);
    alert('Dodano artykuł!');
    document.getElementById('articleForm').reset();
    fetchArticles();
  } catch (err) {
    alert('Błąd: ' + err.message);
  }
});

fetchArticles();

