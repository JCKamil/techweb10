import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fvgkwcvwqbdugexretbi.supabase.co';
const supabaseKey = 'eyJhbGciOi...'; // <-- cały twój klucz
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


