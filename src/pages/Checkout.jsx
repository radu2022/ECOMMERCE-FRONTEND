import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("main street, 0012");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    method: "card", // default
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  // Calculate totals
  const subtotal = cart.products
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);
  const shipping = cart.products.length > 0 ? 5.0 : 0; // $5 flat rate, free if cart empty
//   const estimatedTax = (subtotal * 0.08).toFixed(2); // 8% tax
  const grandTotal = (parseFloat(subtotal)).toFixed(2);

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate order placement (replace with API call in production)
    console.log("Order placed:", {
      cart: cart.products,
      subtotal,
      grandTotal,
      shippingAddress: address,
      paymentMethod: paymentDetails.method,
      ...(paymentDetails.method === "card" && {
        cardDetails: {
          cardName: paymentDetails.cardName,
          cardNumber: paymentDetails.cardNumber,
          expiry: paymentDetails.expiry,
          cvv: paymentDetails.cvv,
        },
      }),
    });
    alert("Order placed successfully!"); // Replace with proper UI feedback
    navigate("/"); // Redirect to home
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleCheckout}
          className="lg:grid lg:grid-cols-3 lg:gap-12"
        >
          {/* Left: Shipping and Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Details */}
            <div className="bg-gray-5 border border-teal-100 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
                Shipping Details
              </h3>
              {isEditingAddress ? (
                <div className="ml-2">
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded font-light"
                    aria-label="Shipping address"
                  />
                  <Button
                    variant="link"
                    className="text-blue-700 mt-1 italic"
                    onClick={() => setIsEditingAddress(false)}
                    aria-label="Save shipping address"
                  >
                    Save Address
                  </Button>
                </div>
              ) : (
                <div className="ml-2">
                  <p>
                    Shipping to:{" "}
                    <span className="text-md italic font-light">{address}</span>
                  </p>
                  <button
                    className="text-blue-700 mt-2 hover:text-blue-800 cursor-pointer"
                    onClick={() => setIsEditingAddress(true)}
                    aria-label="Change shipping address"
                  >
                    Change Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-gray-5 p-6 border border-teal-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
                Payment Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentDetails.method === "card"}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        method: e.target.value,
                      })
                    }
                  />
                  <span className="text-gray-700">Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentDetails.method === "cash"}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        method: e.target.value,
                      })
                    }
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Payment Details */}
            {paymentDetails.method === "card" ? (
              <div className="bg-gray-5 p-6 border border-teal-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
                  Card Details
                </h3>
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="cardName"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentChange}
                    placeholder="Name on card"
                    className="w-full p-2 border rounded font-light"
                    aria-label="Name on card"
                  />
                  <Input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="Card number"
                    className="w-full p-2 border rounded font-light"
                    aria-label="Card number"
                  />
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      name="expiry"
                      value={paymentDetails.expiry}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      className="w-1/2 p-2 border rounded font-light"
                      aria-label="Card expiry date"
                    />
                    <Input
                      type="text"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentChange}
                      placeholder="CVV"
                      className="w-1/2 p-2 border rounded font-light"
                      aria-label="Card CVV"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-5 p-6 border border-teal-100 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
                  Cash Payment
                </h3>
                <p className="text-md italic font-light text-gray-700 ml-2">
                  You’ll pay in{" "}
                  <span className="font-semibold text-green-700">
                    cash upon delivery
                  </span>
                  .
                </p>
              </div>
            )}
            <div className="flex justify-between items-center pt-4 mt-4">
              <Link to="/cart">
                <Button className="bg-teal-800 h-6">Back to Cart</Button>
              </Link>
              <Link to="/shop">
                <Button className="bg-teal-800 h-6">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1 bg-gray-5 border border-teal-100 p-6 rounded-lg shadow-sm sticky top-8 h-fit">
            <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
              Order Summary
            </h3>

            {/* Itemized List */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
              {cart.products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-2 border-b border-dashed"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 object-contain rounded-md border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotals and Costs */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              {/* <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes (Est.)</span>
                <span>{formatCurrency(estimatedTax)}</span>
              </div> */}
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
              <span className="text-xl font-bold text-teal-600">
                Total Price
              </span>
              <span className="text-xl font-bold text-teal-600">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <Button type="submit" className="w-full mt-6 cursor-pointer">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;