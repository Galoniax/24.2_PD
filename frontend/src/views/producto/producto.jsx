import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchProductById } from "../../services/productService";

import { useCategory } from "../../hooks/useCategory";
import { useReviews } from "../../hooks/useReviews";
import { useProducts } from "../../hooks/useProducts";

import { createPurchase } from "../../services/pucharseService";
import { deleteReview, updateReview } from "../../services/reviewService";

import { CartContext } from "../../context/CartContext";

import { useAuth } from "../../hooks/useAuth";
import ReviewForm from "../../components/product/ReviewForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./producto.css";
import { toast } from "react-toastify";

export function Product() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useAuth();

  const [productCategory, setProductCategory] = useState(null);

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const { categoriesData } = useCategory();
  const { productsData } = useProducts();
  const { reviewsData } = useReviews();

  const calculateAverageRating = (productId, reviews) => {
    const productReviews = reviews.filter(
      (review) => review.productId == productId
    );

    if (productReviews.length == 0) return { averageRating: 0, reviewCount: 0 };
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return {
      averageRating: (totalRating / productReviews.length).toFixed(1),
      reviewCount: productReviews.length,
    };
  };

  const handleNewReview = (newReview) => {
    setReviews([...reviews, newReview]);

    const { averageRating, reviewCount } = calculateAverageRating(
      product.id,
      [...reviews, newReview]
    );
    setAverageRating(averageRating);
    setReviewCount(reviewCount);
  };

  const fetchData = async () => {
    try {
      const productDetails = await fetchProductById(id);

      setProduct(productDetails);
      setProductCategory(categoriesData);
      setReviews(reviewsData);

      if (productDetails) {
        const { averageRating, reviewCount } = calculateAverageRating(
          productDetails.id,
          reviewsData
        );
        setAverageRating(averageRating);
        setReviewCount(reviewCount);
      }

      // Filtrar y seleccionar productos relacionados
      const filteredProducts = productsData.filter(
        (p) =>
          p.categoryId == productDetails.categoryId && p.id != productDetails.id
      );

      const shuffledProducts = filteredProducts.sort(() => Math.random() - 0.5);

      setRelatedProducts(shuffledProducts.slice(0, 10)); // Máximo 10 productos
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al obtener productos");
    } finally {
      const relatedProductsContainer =
        document.getElementById("relatedProducts");
      if (relatedProductsContainer) {
        relatedProductsContainer.addEventListener("wheel", (e) => {
          e.preventDefault();
          relatedProductsContainer.scrollLeft += e.deltaY;
        });
      }
    }
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
      toast.error("Debes iniciar sesion");
    } else {
      fetchData();
    }
  }, [id, user, categoriesData, productsData, reviewsData]);

  const handleProductClick = (product) => {
    navigate(`/producto/${product.id}`, {});
  };

  const handlePurchase = async (product) => {
    try {
      const purchase = await createPurchase(user.id, [], product);

      console.log("Compra realizada:", purchase);
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  const handleDeleteReview = async (review) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta reseña?");
    
    if (confirmDelete) {
      try {
        await deleteReview(review);
        setReviews(prevReviews => 
          prevReviews.filter(r => r.id != review.id)
        );
        
      } catch (error) {
        console.error("Error al eliminar la reseña:", error);

      }
    }
  };

  const getProductCategoryName = (categoryId) => {
    if (productCategory) {
      const category = productCategory.find(
        (category) => category.id == categoryId
      );
      return category ? `${category.name}` : "Categoría no encontrada";
    }
    return "Categoría no encontrada";
  };

  const getProductSubcategoryName = (subcategoryId) => {
    if (productCategory) {
      const category = productCategory.find(
        (category) => category.id == product.categoryId
      );
      if (category) {
        const subcategory = category.subcategories.find(
          (subcategory) => subcategory.id == subcategoryId
        );
        return subcategory
          ? `${subcategory.name}`
          : "Subcategoría no encontrada";
      } else {
        return "Categoría no encontrada";
      }
    }
    return "Subcategoría no encontrada";
  };

  return user ? (
    <div className="pt-[150px] w-full max-w-[1400px] m-auto">
      <div className="w-full flex gap-1 mb-10">
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          <Link to="/catalogo">Catálogo /</Link>
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          <Link to="/producto/${product.id}">Producto /</Link>
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          {getProductCategoryName(product?.categoryId)}
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          {getProductSubcategoryName(product?.subcategoryId)}
        </h1>
      </div>
      <div className="w-full flex">
        <div className="w-[40%] me-[200px]">
          <img
            className="w-[100%]"
            src={product?.imageURL}
            alt={product?.name}
          />
        </div>
        <div className="w-[60%] flex flex-col justify-center">
          <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d]">
            {getProductCategoryName(product?.categoryId)}
          </h1>
          <h1 className="textRedHatDisplayMedium font-bold text-[25px] text-[#202020] mt-[10px]">
            {product?.name}
          </h1>

          <p className="textRedHatDisplayRegular text-[15px] tracking-[-1px] text-[#4d4d4d] mt-2">
            ★ {reviewCount} reseñas
          </p>
          <p className="textRedHatDisplayRegular text-[16.5px] tracking-[-1px] text-[#4d4d4d] mt-10 indent-6">
            {product?.description}
          </p>

          {user.role == "user" && (
            <div className="flex flex-col">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#414141] hover:bg-[#585858] text-white font-semibold py-2 px-4 rounded-3xl mt-10"
              >
                Agregar al carrito - ${product?.price}
              </button>
              <button
                onClick={() => handlePurchase(product)}
                className="bg-[#FF9500] hover:bg-[#FFB84D] text-white font-semibold py-2 px-4 rounded-3xl mt-5"
              >
                Comprar ahora
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[150px] h-[50vh]">
        {/*Te puede interesar estos productos.. */}
        {relatedProducts.length > 0 && (
          <div>
            <h1 className="textRedHatDisplayRegular text-[20px] font-bold tracking-[-1px] text-[#4d4d4d] mt-20">
              Te puede interesar estos productos..
            </h1>
            <div className="mt-10 flex justify-center">
              <div
                id="relatedProducts"
                className="flex overflow-x-auto gap-x-4 gap-y-6"
              >
                {relatedProducts.map((relatedProduct) => {
                  const productReviews = reviews.filter(
                    (review) => review.productId == relatedProduct.id
                  );

                  // Calcular el número de reseñas
                  const reviewCount = productReviews.length;

                  return (
                    <div
                      key={relatedProduct.id}
                      className="border min-w-[230px] rounded-lg p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={relatedProduct.imageURL}
                        alt={relatedProduct.name}
                        className="w-full h-[150px] object-cover rounded-md mb-4"
                      />
                      <h2 className="textRedHatDisplayMedium text-[16px] font-bold  text-[#5a5a5a]">
                        {relatedProduct.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-2">
                        ${relatedProduct.price}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ★ {reviewCount} reseñas
                      </p>
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => handleProductClick(relatedProduct)}
                          className="bg-[#414141] hover:bg-[#585858] w-[75%] mt-5 text-white font-semibold py-1 px-3 rounded-lg"
                        >
                          Ver producto
                        </button>
                        {user.role == "user" && (
                          <button
                            onClick={() => addToCart(relatedProduct)}
                            className="bg-[#ffb443] hover:bg-[#ffc266] mt-5 w-[25%] flex items-center text-white font-semibold py-1 px-3 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faCartShopping} />{" "}
                            <p className="ml-1 font-bold">+</p>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="min-h-[100vh]">
        <h1 className="textRedHatDisplayRegular text-[22px] pb-2 border-b border-[#d6d6d6] font-bold tracking-[-1px] text-[#4d4d4d] mt-20">
          Reviews
        </h1>

        <div className="flex justify-center gap-10 py-8 border-b border-[#d6d6d6]">
          <div className="flex items-baseline gap-2">
            <h1 className="textRedHatDisplayRegular text-[45px] font-bold  text-[#000000]">
              {averageRating}
            </h1>
            <p className="textRedHatDisplayRegular text-[20px] font-bold  text-[#606A72]">
              {" "}
              /5
            </p>
          </div>
          <div className="flex flex-col justify-center ">
            <h1 className="textRedHatDisplayRegular text-[16px] font-bold  text-[#000000]">
              ★★★★★
            </h1>
            <p className="textRedHatDisplayRegular text-[14px]  text-[#606A72]">
              {reviewCount} reseñas
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="textRedHatDisplayRegular text-[20px] font-bold tracking-[-1px] text-[#4d4d4d]">
            Agregar una reseña
          </h1>
          <div className="mt-5">
            <ReviewForm
              onChange={handleNewReview}
              productId={product?.id}
              user={user}
            />
          </div>
        </div>

        <div className="mt-10 mb-16 max-h-[450px] overflow-y-auto">
          {reviews.length > 0 ? (
            reviews
              .filter((review) => review.productId == product.id)
              .map((review) => (
                <div
                  key={review.id}
                  className="border min-w-[250px] mt-3 rounded-lg p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="textRedHatDisplayRegular text-[16px] font-bold text-[#5a5a5a]">
                      {review.title}
                    </h2>

                    {user.role == "admin" ? (
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-[#414141]"
                        onClick={() => handleDeleteReview(review)}
                      />
                    ) : (
                      user.role == "user" &&
                      review.userId == user.id && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-[#414141]"
                          onClick={() => handleDeleteReview(review)}
                        />
                      )
                    )}
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{review.comment}</p>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">★ {review.rating}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-center text-[#0f0f0f]">
              No hay reseñas disponibles para este producto.
            </p>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
