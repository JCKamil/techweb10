import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const SUPABASE_URL = "https://fvgkwcvwqbdugexretbi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Z2t3Y3Z3cWJkdWdleHJldGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDAwMzMsImV4cCI6MjA2NDc3NjAzM30.1uQjmY4OKycYzSUl-q9VFWjYiRTNux36i7H17T1pmmA";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/Articles`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article) => (
          <div key={article.id} style={{ marginBottom: "2rem" }}>
            <h2>{article.Title}</h2>
            <h4>{article.Subtitle}</h4>
            <p><strong>By:</strong> {article.Author}</p>
            <p>{article.Content}</p>
            <small>{new Date(article.Created_at).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js działa!');
  fetchArticles();
});

