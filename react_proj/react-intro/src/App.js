import { useState, useEffect } from "react";
import "./style.css";
import "./react-theme.css";

function App() {

  // 🌙 DARK MODE DEFAULT
  const [darkMode, setDarkMode] = useState(true);

  // 🛒 CART
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 59999, img: "laptop.jpg", desc: "HP | 16GB RAM | 512GB SSD" },
    { id: 2, name: "Smartphone", price: 24999, img: "smartphone.jpg", desc: "Samsung | AMOLED | 64MP" },
    { id: 3, name: "Smartwatch", price: 39999, img: "smartwatch.jpg", desc: "Apple Watch | Series 8 | GPS" },
    { id: 4, name: "Tablet", price: 49999, img: "tablet.jpg", desc: "iPad | 10.9-inch | 64GB" }
  ];

  // ➕ ADD TO CART
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ➕➖ UPDATE QTY
  const updateQty = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    ));
  };

  // 💰 TOTAL
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-inner">

          {/* 🔥 TEXT LOGO */}
          <a href="#" className="nav-logo" style={{
            fontWeight: "900",
            fontStyle: "italic",
            fontSize: "28px",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #ffea00, #00e5ff)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>
            ShopEasy React
          </a>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a href="#">Home</a>
            <a href="#" className="active">Products</a>
            <a href="#">Offers</a>
            <a href="#">About Us</a>
            <a href="#">Register</a>
            <a href="#">Contact</a>

            {/* 🌙 DARK MODE TOGGLE */}
            <button
              className="btn-primary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

        </div>
      </nav>

      {/* PRODUCTS */}
      <section>
        <div className="section-inner">
          <h2 className="section-title">Our Products (React)</h2>

          {products.map(p => (
            <div className="card" key={p.id}>

              <img
                src={p.img}
                alt={p.name}
                style={{ width: "180px", marginBottom: "15px" }}
              />

              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <b>₹{p.price}</b>

              <br /><br />

              <button className="btn-primary" onClick={() => addToCart(p)}>
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* CART */}
      <section>
        <div className="section-inner">
          <h2 className="section-title">Cart</h2>

          {cart.length === 0 && <p>No items in cart</p>}

          {cart.map(item => (
            <div className="card" key={item.id}>

              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>

              <p>Total: ₹{item.price * item.qty}</p>

            </div>
          ))}

          <h2>Total Amount: ₹{total}</h2>

        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "20px" }}>
        © 2026 ShopEasy
      </footer>

    </div>
  );
}

export default App;