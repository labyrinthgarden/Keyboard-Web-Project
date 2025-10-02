import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, isLoggedIn } from "../../utils/auth";
import "./CheckoutDark.css";

type Keyboard = {
  name: string;
  price: string;
  image: string;
};

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "PayPal",
  "Apple Pay",
  "Google Pay",
];

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isLoggedIn().then((logged) => {
      if (!logged) navigate("/login");
    });

    if (location.state && (location.state as any).keyboard) {
      setKeyboard((location.state as any).keyboard);
    } else {
      navigate("/shop");
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !cardName ||
      !cardNumber ||
      !expiry ||
      !cvv ||
      cardNumber.length < 12 ||
      cvv.length < 3
    ) {
      setError("Please fill all fields with valid payment details.");
      return;
    }

    setProcessing(true);
    setConfirmation(null);

    setTimeout(async () => {
      const token = getToken();
      const response = await fetch("http://localhost:3000/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setConfirmation(
          `Payment successful! Backend connection confirmed. You bought: ${keyboard?.name} for ${keyboard?.price}.`
        );
      } else {
        setConfirmation("Payment failed. Backend connection error.");
      }
      setProcessing(false);
    }, 1800);
  };

  return (
    <div className="checkout-page min-vh-100 bg-dark text-light d-flex flex-column align-items-center justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 className="text-center text-gradient fw-bold mb-4">Checkout</h2>
        {keyboard && (
          <div className="mb-4 text-center">
            <img
              src={keyboard.image}
              alt={keyboard.name}
              style={{
                width: "100%",
                maxWidth: "220px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "1rem",
                marginBottom: "1rem",
                filter: "brightness(0.85)",
              }}
            />
            <h4 className="fw-semibold mb-1">{keyboard.name}</h4>
            <span className="h6 fw-bold text-accent">{keyboard.price}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={processing}
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              disabled={processing}
              required
              autoComplete="cc-name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              disabled={processing}
              required
              maxLength={16}
              minLength={12}
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label">Expiry</label>
              <input
                type="text"
                className="form-control"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                disabled={processing}
                required
                maxLength={5}
                autoComplete="cc-exp"
                placeholder="MM/YY"
              />
            </div>
            <div className="col-6">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className="form-control"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                disabled={processing}
                required
                maxLength={4}
                minLength={3}
                autoComplete="cc-csc"
                placeholder="123"
              />
            </div>
          </div>
          {error && (
            <div className="alert alert-danger text-center py-2">{error}</div>
          )}
          <button
            type="submit"
            className="btn btn-accent w-100"
            disabled={processing}
          >
            {processing ? "Processing Payment..." : "Pay"}
          </button>
        </form>
        {confirmation && (
          <div className="alert alert-info text-center my-3">{confirmation}</div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
