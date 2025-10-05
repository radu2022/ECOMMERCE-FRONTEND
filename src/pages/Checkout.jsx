import React, { useState } from "react";



// --- MOCK IMPLEMENTATIONS (For single-file compilation) ---

// 1. Mock Link and Button components
const Link = ({ to, className = "", children }) => (
  <a href={to} className={`text-decoration-none ${className}`}>
    {children}
  </a>
);
const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    className={`px-6 py-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50 ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Mock Cart Data (simulating items fetched from Redux)
const MOCK_CART_PRODUCTS = [
  {
    id: 101,
    name: "Luxury Watch Pro",
    price: 350.0,
    quantity: 1,
    image: "https://placehold.co/80x80/285E61/FFFFFF?text=Watch",
  },
  {
    id: 102,
    name: "Noise Cancelling Earbuds",
    price: 129.99,
    quantity: 2,
    image: "https://placehold.co/80x80/38A169/FFFFFF?text=Earbuds",
  },
  {
    id: 103,
    name: "Portable Charger 10000mAh",
    price: 45.5,
    quantity: 1,
    image: "https://placehold.co/80x80/6366F1/FFFFFF?text=Charger",
  },
];

const CheckoutPage = () => {
  // State to handle form data (mocked)
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "US",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate an async checkout process
    setTimeout(() => {
      alert("Checkout complete! (Simulated)");
      setIsProcessing(false);
      // In a real app, you'd redirect to a confirmation page
    }, 2000);
  };

  // Calculation logic
  const subtotal = MOCK_CART_PRODUCTS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0.0 : 15.0; // Free shipping over $100
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  const grandTotal = subtotal + shipping + estimatedTax;

  // Custom Input component for consistent styling
  const CheckoutInput = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
  }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleFormChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
      />
    </div>
  );

  const OrderSummary = () => (
    <div className="lg:sticky lg:top-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
        Order Summary
      </h3>

      {/* Itemized list */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {MOCK_CART_PRODUCTS.map((item) => (
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
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
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
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE" : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Taxes (Est.)</span>
          <span>{formatCurrency(estimatedTax)}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-2xl font-extrabold text-teal-600">
          {formatCurrency(grandTotal)}
        </span>
      </div>
    </div>
  );

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
          {/* Left Column: Shipping & Payment (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-12">
            {/* 1. Shipping Information */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3 bg-teal-500 text-white rounded-full flex items-center justify-center text-lg font-mono">
                  1
                </span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckoutInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
                <CheckoutInput
                  label="Full Name"
                  name="fullName"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <CheckoutInput
                label="Street Address"
                name="address"
                placeholder="1234 Main St"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CheckoutInput
                  label="City"
                  name="city"
                  placeholder="Anytown"
                  required
                />
                <CheckoutInput
                  label="ZIP / Postal Code"
                  name="zip"
                  placeholder="90210"
                  required
                />
                {/* Simplified select for demo */}
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 h-[42px]"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Payment Information */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 mr-3 bg-teal-500 text-white rounded-full flex items-center justify-center text-lg font-mono">
                  2
                </span>
                Payment Method
              </h2>

              {/* Payment Options */}
              <div className="space-y-4">
                {/* Credit Card Option */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <label className="flex items-center space-x-3 text-lg font-medium text-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                    />
                    <span>Credit Card / Debit Card</span>
                  </label>

                  {/* Card Details Form (Only visible when 'card' is selected) */}
                  {paymentMethod === "card" && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 gap-4">
                        <CheckoutInput
                          label="Card Number"
                          name="cardNumber"
                          type="text"
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <CheckoutInput
                          label="Expiration (MM/YY)"
                          name="expiry"
                          type="text"
                          placeholder="01/25"
                          required
                        />
                        <CheckoutInput
                          label="CVC"
                          name="cvc"
                          type="text"
                          placeholder="123"
                          required
                        />
                        <CheckoutInput
                          label="Name on Card"
                          name="cardName"
                          type="text"
                          placeholder="J. Doe"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal Option */}
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === "paypal"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <label className="flex items-center space-x-3 text-lg font-medium text-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Final Checkout Button */}
            <div className="pt-4 pb-12 lg:pb-0">
              <Button
                type="submit"
                className="w-full bg-teal-600 text-white hover:bg-teal-700 shadow-xl"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Place Order - ${formatCurrency(grandTotal)}`
                )}
              </Button>
            </div>
          </div>

          {/* Right Column: Order Summary (1/3 width on desktop) */}
          <div className="lg:col-span-1 mt-10 lg:mt-0">
            <OrderSummary />
          </div>
        </form>

        {/* Back to Cart Link */}
        <div className="text-center mt-10">
          <Link
            to="/cart"
            className="text-teal-600 hover:text-teal-800 font-medium transition flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
