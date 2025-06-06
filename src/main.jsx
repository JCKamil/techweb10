async function fetchArticles() {
  const API_URL = 'https://fvgkwcvwqbdugexretbi.supabase.co/rest/v1/articles';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA'; // Twój pełny anon/public API key

  console.log('fetchArticles wywołane');

  try {
    const response = await fetch(API_URL, {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();
    console.log('Odebrane artykuły:', articles);

    const container = document.getElementById('articlesContainer');

    if (!container) {
      console.error('Brak elementu #articlesContainer w HTML!');
      return;
    }

    if (!Array.isArray(articles) || articles.length === 0) {
      container.innerHTML = '<p>Brak artykułów do wyświetlenia.</p>';
      return;
    }

    // Wyczyść poprzednie
    container.innerHTML = '';

    // Dodaj każdy artykuł
    articles.forEach((article) => {
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <h4>${article.subtitle}</h4>
        <p><strong>Autor:</strong> ${article.author || 'Nieznany'}</p>
        <p><strong>Data:</strong> ${new Date(article.created_at).toLocaleDateString()}</p>
        <p>${article.content}</p>
        <hr>
      `;
      container.appendChild(articleElement);
    });
  } catch (error) {
    console.error('Błąd podczas pobierania artykułów:', error);
  }
}

// Wywołanie przy starcie
fetchArticles();


