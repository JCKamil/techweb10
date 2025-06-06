import './style.css';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

const supabase = createClient('https://fvgkwcvwqbdugexretbi.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA ');

const articleList = document.querySelector('#article-list');
const form = document.querySelector('#article-form');
const sortSelect = document.querySelector('#sort-select');

async function fetchArticles(sort = 'created_at.desc') {
  const [field, direction] = sort.split('.');
  const { data: article } = await supabase
    .from('article')
    .select('*')
    .order(field, { ascending: direction === 'asc' });

  articleList.innerHTML = article.map(article => `
    <div class="border p-4 rounded shadow">
      <h2 class="text-xl font-bold">${article.title}</h2>
      <h3 class="italic text-gray-600">${article.subtitle}</h3>
      <p class="text-sm text-gray-500">Autor: ${article.author}</p>
      <p class="text-sm text-gray-500">Data: ${format(new Date(article.created_at), 'dd-MM-yyyy')}</p>
      <p>${article.content}</p>
    </div>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newArticle = Object.fromEntries(formData.entries());
  await supabase.from('article').insert([newArticle]);
  form.reset();
  fetchArticles(sortSelect.value);
});

sortSelect.addEventListener('change', () => {
  fetchArticles(sortSelect.value);
});

fetchArticles();
