import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fvgkwcvwqbdugexretbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA'; // <-- cały twój klucz
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchArticles() {
  const { data, error } = await supabase.from('Articles').select('*');
  if (error) {
    console.error('Błąd podczas pobierania:', error.message);
    return;
  }

  console.log("Dane z Supabase:", data); // 👈 Dodaj to!
  const container = document.getElementById('articlesContainer');
  container.innerHTML = '';

  data.forEach(article => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${article.Title}</h3>
      <h4>${article.Subtitle}</h4>
      <p>${article.Content}</p>
      <small>Autor: ${article.Author} | Dodano: ${new Date(article.Created_at).toLocaleDateString()}</small>
      <hr />
    `;
    container.appendChild(div);
  });
}

fetchArticles();


