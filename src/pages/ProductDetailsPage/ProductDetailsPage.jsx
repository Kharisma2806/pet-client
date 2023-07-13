import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CartContext from "../../components/cartContext";
import ShopHeader from "../../components/shopHeader/shopHeader";

function ProductDetailsPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/shop_products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async (productId, name, image) => {
    try {
      const res = await fetch(`http://localhost:5005/api/cart/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image }),
      });
  
      if (res.ok) {
        const addedProduct = await res.json();
        const updatedCartItems = [...cartItems];
  
        // Check if the product already exists in the cart
        const existingProductIndex = updatedCartItems.findIndex(
          (item) => item.productId === addedProduct.productId
        );
  
        if (existingProductIndex !== -1) {
          // If the product already exists, update the quantity by adding 1
          updatedCartItems[existingProductIndex].quantity += 1;
        } else {
          // If the product is new, add it to the cart with a quantity of 1
          addedProduct.quantity = 1;
          updatedCartItems.push(addedProduct);
        }
  
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        console.error("Error adding to cart:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ShopHeader title="Shop Page" />
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button className="bg-lime-800 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded"onClick={() => handleAddToCart(productId, product.name, product.image)}>
        Add to Cart
      </button>
      <Link className="bg-lime-800 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded" to="/cart">Go to Cart</Link>
    </div>
  );
}

export default ProductDetailsPage;
