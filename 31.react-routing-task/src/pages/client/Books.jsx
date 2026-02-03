import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../../context/FavoritesContext";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import "./Books.css";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setErrMsg("");
        const res = await api.get("/books");
        console.log("API /books response:", res.data); 
        setBooks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Books fetch error:", err);
        const msg =
          err?.response?.status
            ? `Request failed: ${err.response.status}`
            : err?.message || "Unknown error";
        setErrMsg(msg);
        toast.error("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="loading">Loading books...</div>;

  return (
    <div className="books-page container">
      <h2>Our Collection</h2>

      
      {errMsg ? (
        <p style={{ marginTop: 12, color: "crimson" }}>
          API error: {errMsg}
        </p>
      ) : null}

     
      {!errMsg && books.length === 0 ? (
        <p style={{ marginTop: 12 }}>No books found.</p>
      ) : null}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <img
                src={book.coverImageURL}
                alt={book.title}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
            </div>

            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="price">${book.price}</p>

              <div className="book-actions">
                <Link to={`/books/${book.id}`} className="details-btn">
                  Details
                </Link>

                <button
                  className={`fav-btn ${isFavorite(book.id) ? "active" : ""}`}
                  onClick={() =>
                    isFavorite(book.id)
                      ? removeFromFavorites(book.id)
                      : addToFavorites(book)
                  }
                >
                  {isFavorite(book.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
