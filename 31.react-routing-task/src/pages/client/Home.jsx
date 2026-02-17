import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section container">
        <div className="hero-content">
          <span className="subtitle">BEST SELLER BOOK OF THE WEEK</span>
          <h1 className="hero-title">Clue Of The Wooden Cottage</h1>
          <p className="hero-description">
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
          <Link to="/books/1" className="buy-btn">BUY NOW...</Link>


        </div>
        <div className="hero-image">
          <img src="https://themewagon.github.io/author-colorlib/images/bg_1.jpg" alt="Person reading on books" />
        </div>
      </div>


      <div className="about-book-section container">
        <div className="about-book-image">
          <img src="https://m.media-amazon.com/images/I/71V0df6wu+L.jpg" alt="Book Cover" />
        </div>
        <div className="about-book-content">
          <h2>About The Book</h2>
          <p>
            A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
          </p>
          <h3>Award achievements</h3>
          <p>
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
