import React, { useEffect, useState } from "react";
import './HomeDark.css';

type Keyboard = {
  name: string;
  price: string;
  image: string;
};

const Home: React.FC = () => {
    const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="min-vh-100 bg-dark text-light home-dark">
            <header className="py-5 text-center border-bottom border-secondary">
                <h1 className="display-4 fw-bold mb-2 text-gradient">Keyboards Shop</h1>
                <p className="lead text-light-50">Find your perfect keyboard for work or play</p>
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
                    <section className="row g-4 justify-content-center">
                        {keyboards.map((kb) => (
                            <div key={kb.name} className="col-12 col-md-4 d-flex">
                                <div className="card w-100 bg-gradient-dark border-0 shadow-lg">
                                    <img
                                        src={kb.image}
                                        alt={kb.name}
                                        className="card-img-top rounded-top"
                                        style={{ height: "200px", objectFit: "cover", filter: "brightness(0.85)" }}
                                    />
                                    <div className="card-body text-center">
                                        <h2 className="h5 fw-semibold mb-2 text-light">{kb.name}</h2>
                                        <span className="h6 fw-bold text-accent mb-3 d-block">{kb.price}</span>
                                        <button className="btn btn-accent px-4 py-2 rounded-pill shadow-sm">Shop Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>
            <footer className="mt-5 py-4 text-center text-light-50 small border-top border-secondary">
                &copy; {new Date().getFullYear()} Keyboards Shop. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;