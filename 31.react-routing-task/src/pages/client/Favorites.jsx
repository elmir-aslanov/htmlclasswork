import { FaTrash, FaHeartBroken } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  return (
    <div className="favorites-page container">
      <div className="favorites-header">
        <h2>Your Favorites</h2>
        {favorites.length > 0 && (
          <button onClick={clearFavorites} className="clear-btn">
            Empty All <FaTrash />
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorite books yet.</p>
          <Link to="/books" className="cta-button">Browse Books</Link>
        </div>
      ) : (
        <div className="books-grid">
          {favorites.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.coverImageURL} alt={book.title} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="price">${book.price}</p>
                <div className="book-actions">
                  <Link to={`/books/${book.id}`} className="details-btn">Details</Link>
                  <button 
                    className="fav-btn active" 
                    onClick={() => removeFromFavorites(book.id)}
                    title="Remove from favorites"
                  >
                    <FaHeartBroken />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
