import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import './ShopDark.css';

type Keyboard = {
  name: string;
  price: string;
  image: string;
};

const Shop: React.FC = () => {
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn().then((logged) => {
      if (!logged) navigate('/login');
    });
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:3000/keyboards')
      .then(res => {
        if (!res.ok) throw new Error('Error fetching keyboards');
        return res.json();
      })
      .then(data => {
        setKeyboards(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleBuy = (kb: Keyboard) => {
    navigate('/checkout', { state: { keyboard: kb } });
  };

  return (
    <div className="shop-page min-vh-100 bg-dark text-light">
      <header className="py-5 text-center border-bottom border-secondary">
        <h1 className="display-4 fw-bold mb-2 text-gradient">Shop Keyboards</h1>
        <p className="lead text-light-50">Select and buy your favorite keyboard</p>
      </header>
      <main className="container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-accent mb-3" role="status" />
            <div>Loading keyboards...</div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center my-5">{error}</div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {keyboards.map((kb) => (
              <div key={kb.name} className="col">
                <div className="card h-100 bg-gradient-dark border-0 shadow-lg">
                  <img
                    src={kb.image}
                    alt={kb.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", filter: "brightness(0.85)" }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h2 className="h5 fw-semibold mb-2 text-light">{kb.name}</h2>
                    <span className="h6 fw-bold text-accent mb-3">{kb.price}</span>
                    <button
                      className="btn btn-accent px-4 py-2 rounded-pill shadow-sm"
                      onClick={() => handleBuy(kb)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
