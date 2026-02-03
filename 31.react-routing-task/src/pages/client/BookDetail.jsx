import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { api } from "../../services/api"; 

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        try {
          const allResponse = await api.get("/books");
          const found = allResponse.data.find((b) => b.id.toString() === id);
          if (found) setBook(found);
          else navigate("/not-found", { replace: true }); 
        } catch (e) {
          console.error("Error fetching book details:", e);
          navigate("/not-found", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (!book) return null;

  return (
    <div className="book-detail-page container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <FaArrowLeft /> Back
      </button>

      <div className="detail-card">
        <div className="detail-image">
          <img
            src={book.coverImageURL}
            alt={book.title}
            onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
          />
        </div>

        <div className="detail-info">
          <h2>{book.title}</h2>
          <h3>by {book.author}</h3>
          <p className="detail-price">${book.price}</p>

          <div className="detail-description">
            <h4>Description</h4>
            <p>{book.description || "No description available."}</p>
          </div>

          <div className="detail-meta">
            <p>
              <strong>Stock:</strong> {book.stock}
            </p>
            <p>
              <strong>Rating:</strong> {book.rating} / 5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
