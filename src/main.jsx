const API_URL = 'https://fvgkwcvwqbdugexretbi.supabase.co/rest/v1/Articles';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA';

async function fetchArticles() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    console.log('Artykuły z Supabase:', data);

    const container = document.getElementById('articlesContainer');
    container.innerHTML = ''; // wyczyść stare artykuły

    data.forEach((article) => {
      const div = document.createElement('div');
      div.className = 'article';
      div.innerHTML = `
        <h2>${article.Title}</h2>
        <h4>${article.Subtitle}</h4>
        <p><strong>Autor:</strong> ${article.Author}</p>
        <p>${article.Content}</p>
        <hr />
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Błąd podczas pobierania artykułów:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js działa!');
  fetchArticles();
});

