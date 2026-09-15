import { useEffect, useState } from "react";

import axios from "axios";

import "./index.css";

const API = "http://localhost:5000";

function App() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [aiQuestion, setAiQuestion] = useState("");

  const [aiProducts, setAiProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {

    try {

      const response =
        await axios.get(
          `${API}/api/products`
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function searchProducts(e) {

    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {

      loadProducts();

      return;

    }

    try {

      const response =
        await axios.get(
          `${API}/api/products/search?q=${value}`
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  function addToCart(product) {

    setCart(prev => [
      ...prev,
      product
    ]);

  }

  function removeFromCart(index) {

    setCart(
      cart.filter(
        (_, i) => i !== index
      )
    );

  }

  const total =
    cart.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );

  async function askAI() {

    if (!aiQuestion.trim()) {

      alert("Please ask something.");

      return;

    }

    try {

      const response =
        await axios.post(
          `${API}/api/ai/recommend`,
          {
            question: aiQuestion
          }
        );

      setAiProducts(
        response.data.products
      );

    } catch (error) {

      alert("AI service error.");

    }

  }

  async function register() {

    try {

      await axios.post(
        `${API}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      alert(
        "Registration successful!"
      );

      setShowRegister(false);

      setShowLogin(true);

      setName("");

      setEmail("");

      setPassword("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  }

  async function login() {

    try {

      const response =
        await axios.post(
          `${API}/api/auth/login`,
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setUser(
        response.data.user
      );

      setShowLogin(false);

      setEmail("");

      setPassword("");

      alert("Login successful!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  }

  function logout() {

    localStorage.removeItem("token");

    setUser(null);

  }

  async function checkout() {

    if (cart.length === 0) {

      alert("Cart is empty.");

      return;

    }

    if (!user) {

      alert(
        "Please login before checkout."
      );

      setShowCart(false);

      setShowLogin(true);

      return;

    }

    try {

      await axios.post(
        `${API}/api/orders`,
        {
          user: user.id,

          products:
            cart.map(product => ({
              product: product._id,
              quantity: 1
            })),

          totalAmount: total

        }
      );

      alert(
        "?? Order placed successfully!"
      );

      setCart([]);

      setShowCart(false);

    } catch (error) {

      alert("Order failed.");

    }

  }

  return (

    <div>

      <header>

        <div className="logo">
          ??? AI E-Commerce
        </div>

        <div className="nav">

          {user ? (

            <>
              <span>
                ?? {user.name}
              </span>

              <button
                onClick={logout}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <button
                onClick={() =>
                  setShowLogin(true)
                }
              >
                Login
              </button>

              <button
                onClick={() =>
                  setShowRegister(true)
                }
              >
                Register
              </button>
            </>

          )}

          <button
            onClick={() =>
              setShowCart(true)
            }
          >
            ?? Cart ({cart.length})
          </button>

        </div>

      </header>


      <section className="hero">

        <h1>
          AI-Powered E-Commerce Website
        </h1>

        <p>
          Smart Shopping using MERN Stack
        </p>

        <input
          className="search"
          value={search}
          onChange={searchProducts}
          placeholder="?? Search products..."
        />

      </section>


      <section className="products">

        <h2>
          ??? Products
        </h2>

        <div className="grid">

          {products.map(product => (

            <div
              className="card"
              key={product._id}
            >

              <div className="productIcon">
                {product.icon}
              </div>

              <h3>
                {product.name}
              </h3>

              <p>
                {product.description}
              </p>

              <div className="price">
                ?{product.price}
              </div>

              <button
                className="add"
                onClick={() =>
                  addToCart(product)
                }
              >
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </section>


      <section className="aiSection">

        <h2>
          ?? AI Shopping Assistant
        </h2>

        <p>
          Ask me what product you need.
        </p>

        <div className="aiInput">

          <input
            value={aiQuestion}
            onChange={e =>
              setAiQuestion(
                e.target.value
              )
            }
            placeholder="Example: I need a cheap gaming product"
          />

          <button
            onClick={askAI}
          >
            Ask AI
          </button>

        </div>


        {aiProducts.length > 0 && (

          <div className="aiResults">

            <h3>
              Recommended Products
            </h3>

            {aiProducts.map(product => (

              <div
                className="aiItem"
                key={product._id}
              >

                <span>
                  {product.icon}
                  {" "}
                  {product.name}
                </span>

                <strong>
                  ?{product.price}
                </strong>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add
                </button>

              </div>

            ))}

          </div>

        )}

      </section>


      {showCart && (

        <div className="overlay">

          <div className="cart">

            <button
              className="close"
              onClick={() =>
                setShowCart(false)
              }
            >
              ?
            </button>

            <h2>
              ?? Shopping Cart
            </h2>

            {cart.length === 0 ? (

              <p>
                Your cart is empty.
              </p>

            ) : (

              cart.map(
                (product, index) => (

                  <div
                    className="cartItem"
                    key={index}
                  >

                    <span>
                      {product.icon}
                      {" "}
                      {product.name}
                    </span>

                    <strong>
                      ?{product.price}
                    </strong>

                    <button
                      onClick={() =>
                        removeFromCart(index)
                      }
                    >
                      Remove
                    </button>

                  </div>

                )
              )

            )}

            <h3>
              Total: ?{total}
            </h3>

            <button
              className="checkout"
              onClick={checkout}
            >
              Checkout
            </button>

          </div>

        </div>

      )}


      {showLogin && (

        <div className="modal">

          <div className="modalBox">

            <button
              className="close"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ?
            </button>

            <h2>
              ?? Login
            </h2>

            <input
              placeholder="Email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)
              }
            />

            <button
              className="mainButton"
              onClick={login}
            >
              Login
            </button>

          </div>

        </div>

      )}


      {showRegister && (

        <div className="modal">

          <div className="modalBox">

            <button
              className="close"
              onClick={() =>
                setShowRegister(false)
              }
            >
              ?
            </button>

            <h2>
              ?? Register
            </h2>

            <input
              placeholder="Name"
              value={name}
              onChange={e =>
                setName(e.target.value)
              }
            />

            <input
              placeholder="Email"
              value={email}
              onChange={e =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e =>
                setPassword(e.target.value)
              }
            />

            <button
              className="mainButton"
              onClick={register}
            >
              Create Account
            </button>

          </div>

        </div>

      )}


      <footer>

        <h3>
          AI-Powered E-Commerce Website
        </h3>

        <p>
          MERN Stack Project
        </p>

        <p>
          MongoDB • Express.js • React.js • Node.js
        </p>

        <p>
          © 2026 AI E-Commerce
        </p>

      </footer>

    </div>

  );

}

export default App;
