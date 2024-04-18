import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(initialCart);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    updateTotalPrice();
  }, [cart]);

  const updateItemPrice = (item, quantity) => {
    const price = parseFloat(item.price);
    const totalPrice = price * quantity;
    item.totalPrice = totalPrice.toFixed(2);
  };

  const updateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += parseFloat(item.totalPrice || item.price);
    });
    setTotalPrice(totalPrice.toFixed(2));
  };

  const handleIncrement = (item) => {
    if (item.quantity >= item.stock) {
      alert(`Only ${item.stock} stocks available`);
    } else if (item.quantity < 1) {
      alert("Invalid quantity");
    } else {
      item.quantity++;
      updateItemPrice(item, item.quantity);
      updateTotalPrice();
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      updateItemPrice(item, item.quantity);
      updateTotalPrice();
    }
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotalPrice();
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {

      if (!auth?.token) {
        toast.error("Please log in to proceed with the payment");
        return;
      }

      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);


      navigate("/Dashboard/UserDashboard/Orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const initPayment = (product) => {
    const options = {
      key: "rzp_test_X95luzrUXuWQHr",
      price: product.price,
      name: product.name,
      description: "Test Transaction",
      _id: product._id,

      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/v1/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlepayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/v1/payment/orders";
      const { data } = await axios.post(orderUrl, {
        
        amount: parseFloat(totalPrice), // Send the total amount directly
      });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      // Product is already in the cart, increment the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart, () => {
        // Update local storage after setting the updated cart state
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      });
    } else {
      // Product is not in the cart, add it with a quantity of 1
      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        // ... other properties
      };

      setCart([...cart, newItem], () => {
        // Update local storage after setting the updated cart state
        localStorage.setItem("cart", JSON.stringify([...cart, newItem]));
      });
    }
  };

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-summary">
          <h2>Shopping Cart</h2>
          <div className="row mb-2 mt-4">
            <div className="col-md-12">
              <h1 className="text-center p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.firstname}  ${auth?.token && auth?.user?.lastname}`}
              </h1>
              <h4 className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout"
                    }`
                  : " Your Cart Is Empty"}
              </h4>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      alt={item.name}
                      className="img-fluid"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="decrement-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="increment-btn"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="item-price">
                    ₹{" "}
                    <span data-price={item.price}>
                      {item.totalPrice || item.price}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address} ,
                  {auth?.user?.streetaddress}</h5>
                  <h5>{auth?.user?.city} , 
                  {auth?.user?.state} </h5>
                  <h5>{auth?.user?.postal}</h5>
                 
                  <button
                    className="btn-outline-warning"
                    onClick={() => navigate("/Dashboard/UserDashboard/Profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/Dashboard/UserDashboard/Profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className=" btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-2">
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className=" btn-primary mb-2"
              
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
                <div>
                {/*<button onClick={handlepayment} className="btn-primary mb-2">
                  Payment 2
                </button>*/}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
