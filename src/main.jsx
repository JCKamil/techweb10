// Ustawienia Supabase
const API_URL = 'https://fvgkwcvwqbdugexretbi.supabase.co/rest/v1/articles';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA'; // ← Twój prawdziwy "anon" klucz

// Pobierz artykuły i wyświetl je
async function fetchArticles() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`
      }
    });

    const articles = await response.json();
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    articles.forEach(article => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${article.title}</h2>
        <h3>${article.subtitle}</h3>
        <p><strong>Autor:</strong> ${article.author}</p>
        <p><strong>Data:</strong> ${new Date(article.created_at).toLocaleDateString()}</p>
        <p>${article.content}</p>
        <hr>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error('Błąd przy pobieraniu artykułów:', err);
  }
}

// Dodaj artykuł do Supabase
async function addArticle(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify([{ title, subtitle, author, content }])
    });

    if (!response.ok) throw new Error('Nie udało się dodać artykułu');

    document.getElementById('articleForm').reset();
    fetchArticles(); // odśwież listę

  } catch (err) {
    console.error('Błąd przy dodawaniu artykułu:', err);
  }
}

// Po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
  fetchArticles();
  document.getElementById('articleForm').addEventListener('submit', addArticle);
});

