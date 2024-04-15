import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { FaUserCircle } from "react-icons/fa";
//import { MdOutlineShoppingCart } from "react-icons/md";
import ShopHeader from "../../components/shopHeader/shopHeader";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./ShopHomePage.css";

function ShopHomePage() {
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //before the deployment
        const res = await fetch("http://localhost:5005/api/shop_products");
        //const res = await fetch("https://petapp.fly.dev/api/shop_products");
        const data = await res.json();
        console.log("Fetched products:", data);
        const groupedProducts = groupProductsByCategory(data);
        console.log("Grouped products:", groupedProducts);
        setGroupedProducts(groupedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const groupProductsByCategory = (products) => {
    const groupedProducts = {};
    products.forEach((product) => {
      const { category } = product;
      if (groupedProducts[category]) {
        groupedProducts[category].push(product);
      } else {
        groupedProducts[category] = [product];
      }
    });
    return groupedProducts;
  };

  const handleSlideChange = (event) => {
    console.log("Slide changed:", event.item);
  };

  const mapImagesToSlides = (images, products) => {
    const slides = [];
    console.log("Products:", products);

    const numSlides =
      window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4; // Number of slides based on screen size

    for (let i = 0; i < images.length; i += numSlides) {
      const slideProducts = products.slice(i, i + numSlides);

      slides.push(
        <div className="slide flex justify-center space-x-2 mt-8" key={i}>
          {slideProducts.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              className="product-card relative"
              key={index}
            >
              <div className="border-black border-1 absolute inset-0"></div>
              <img src={images[i + index]} alt="" className="carousel-image" />
            </Link>
          ))}
        </div>
      );
    }

    return slides;
  };

  return (
    <div className="shop-home-page">
      <ShopHeader title="Shop Page" />
      <h1 className="shadow h-20 flex justify-between items-center"></h1>
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className={`category ${category.toLowerCase()}`}>
            <h2 className={`category-name-${category.toLowerCase()}`}>
              {category}
            </h2>
            <AliceCarousel
              mouseTracking
              items={mapImagesToSlides(
                products.map((product) => product.image),
                products
              )}
              stagePadding={{ paddingLeft: 50, paddingRight: 50 }}
              onSlideChanged={handleSlideChange}
              buttonsDisabled={true} // Disable default buttons
              renderPrevButton={({ isDisabled }) => (
                <button
                  className={`custom-carousel-button prev-button ${category.toLowerCase()}`}
                  disabled={isDisabled}
                >
                  Prev
                </button>
              )}
              renderNextButton={({ isDisabled }) => (
                <button
                  className={`custom-carousel-button next-button ${category.toLowerCase()}`}
                  disabled={isDisabled}
                >
                  Next
                </button>
              )}
            />
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ShopHomePage;
