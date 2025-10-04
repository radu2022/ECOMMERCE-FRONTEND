import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../assets/Images/emptycart.png";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice"; // Adjust the import path based on your project structure

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [address, setAddress] = useState("main street, 0012");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Calculate total quantity and price if not provided by Redux
  const totalQuantity = cart.products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = cart.products
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      {cart.products.length > 0 ? (
        <div className="p-2">
          <h3 className="text-3xl font-bold mb-8">SHOPPING CART</h3>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* 1. Cart Items Table (Main Section) */}
            <div className="lg:w-2/3">
              <div className="bg-gray-5 rounded-lg shadow-sm sticky p-2 md:p-2 mb-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                  {/* Table Header (Hidden on small screens where layout changes) */}
                  <thead className="hidden md:table-header-group">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        PRODUCT
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                        PRICE
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                        QTY
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                        SUBTOTAL
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                        REMOVE
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body - Responsive for Mobile/Tablets */}
                  <tbody className="divide-y divide-gray-200">
                    {cart.products.map((product) => (
                      <tr
                        key={product.id}
                        className="block md:table-row py-4 md:py-0"
                      >
                        {/* PRODUCT DETAILS (Full width on mobile) */}
                        <td className="p-0 md:px-4 md:py-2 md:table-cell w-full md:w-auto">
                          <div className="flex items-center space-x-4">
                            <img
                              className="h-20 w-20 object-contain rounded"
                              src={product.image}
                              alt={product.name}
                            />
                            <span className="font-light text-lg">
                              {product.name}
                            </span>
                          </div>
                        </td>

                        {/* PRICE (Moves to inline on mobile) */}
                        <td className="px-6 py-2 md:py-4 md:table-cell text-center md:text-left font-light before:content-['Price:'] md:before:content-[''] block md:w-auto">
                          ${product.price.toFixed(2)}
                        </td>

                        {/* QUANTITY CONTROLS */}
                        <td className="px-6 py-2 md:py-4 md:table-cell text-center md:text-left block md:w-auto">
                          <div className="flex items-center justify-start md:justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                dispatch(decrementQuantity(product.id))
                              }
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="hover:bg-red-100 cursor-pointer"
                            >
                              -
                            </Button>
                            <span className="text-center w-9 font-semibold">
                              {product.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                dispatch(incrementQuantity(product.id))
                              }
                              aria-label={`Increase quantity of ${product.name}`}
                              className="hover:bg-green-100 cursor-pointer tracking-wider"
                            >
                              +
                            </Button>
                          </div>
                        </td>

                        {/* SUBTOTAL */}
                        <td className="px-6 py-2 md:py-4 md:table-cell text-center md:text-left font-light before:content-['Subtotal:'] md:before:content-[''] block md:w-auto">
                          ${(product.quantity * product.price).toFixed(2)}
                        </td>

                        {/* REMOVE BUTTON */}
                        <td className="px-6 py-2 md:py-4 md:table-cell text-center block md:w-auto">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(product.id))}
                            aria-label={`Remove ${product.name} from cart`}
                            className="hover:bg-red-500 cursor-pointer"
                          >
                            <FaTrashAlt size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-1/3 bg-gray-5 p-6 rounded-lg shadow-sm sticky top-8 h-fit">
              <h3 className="text-xl font-bold mb-2 border-b pb-2 text-gray-700 uppercase">
                Cart Summary
              </h3>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">
                  {cart.totalQuantity || totalQuantity}
                </span>
              </div>

              {/* Shipping Address Logic */}
              <div className="mb-10 border-b pb-2">
                <h4 className="font-bold text-gray-700 mb-2">
                  Shipping Details
                </h4>
                {isEditingAddress ? (
                  <div className="ml-2">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border rounded font-light"
                      aria-label="Shipping address"
                    />
                    <Button
                      variant="link"
                      className="text-blue-500 mt-1"
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
                      <span className="text-md italic font-light">
                        {address}
                      </span>
                    </p>
                    <Button
                      variant="link"
                      className="text-blue-500 mt-2 hover:text-blue-700 cursor-pointer"
                      onClick={() => setIsEditingAddress(true)}
                      aria-label="Change shipping address"
                    >
                      Change Address
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-between font-bold text-lg mb-2">
                <span>Total Price</span>
                <span>${cart.totalPrice?.toFixed(2) || totalPrice}</span>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-red-600 hover:bg-red-800">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={EmptyCart} alt="Empty cart illustration" className="h-96" />
          <p className="text-lg mt-4">Your cart is empty.</p>
          <Link to="/shop">
            <Button className="mt-4">Shop Now</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
