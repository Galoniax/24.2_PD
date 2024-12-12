import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchProductById } from "../../services/productService";

import { useCategory } from "../../hooks/useCategory";
import { useReviews } from "../../hooks/useReviews";
import { useProducts } from "../../hooks/useProducts";

import { createPurchase } from "../../services/pucharseService";
import { deleteReview, updateReview } from "../../services/reviewService";

import { CartContext } from "../../context/CartContext";
import RelatedProducts from "../../components/product/RelatedProducts";

import { useAuth } from "../../hooks/useAuth";
import ReviewForm from "../../components/product/ReviewForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "./producto.css";
import { toast } from "react-toastify";

import { ROUTES } from "../../constants/constants";

export function Product() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, isAuthenticated } = useAuth();

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [productCategory, setProductCategory] = useState(null);
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const { categoriesData } = useCategory();
  const { productsData } = useProducts();
  const { reviewsData, addReview } = useReviews();

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

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
    addReview(newReview);
    const updatedReviews = [...reviewsData, newReview];

    const { averageRating, reviewCount } = calculateAverageRating(
      product.id,
      updatedReviews
    );
    setAverageRating(averageRating);
    setReviewCount(reviewCount);
  };

  const fetchData = async () => {
    try {
      const productDetails = await fetchProductById(id);
      setProduct(productDetails);

      if (productDetails) {
        setProduct(productDetails);
        setProductCategory(productDetails.categoryId);
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

      const productsToShow =
        filteredProducts.length > 0
          ? filteredProducts
          : productsData.filter((p) => p.id != productDetails.id);

      const shuffledProducts = productsToShow.sort(() => Math.random() - 0.5);

      setRelatedProducts(shuffledProducts.slice(0, 10)); // Máximo 10 productos
    } catch (error) {
      console.error("Error al obtener productos:", error);
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
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      toast.error("Debes iniciar sesión");
    } else {
      fetchData();
    }
  }, [id, user, productsData, reviewsData]);

  const handleProductClick = (product) => {
    navigate(ROUTES.PRODUCTO.replace(":id", product.id), {});
  };

  const handlePurchase = async (product) => {
    const confirmPucharse = window.confirm("¿Deseas comprar este producto?");

    if (confirmPucharse) {
      try {
        await createPurchase(user.id, [], product);
        console.log("Compra realizada:", purchase);
      } catch (error) {
        console.error("Error al realizar la compra:", error);
      }
    }
  };

  const handleDeleteReview = async (review) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta reseña?"
    );

    if (confirmDelete) {
      try {
        await deleteReview(review);
        setReviews((prevReviews) =>
          prevReviews.filter((r) => r.id != review.id)
        );

        // Actualizar el promedio y la cantidad de reseñas
        const { averageRating, reviewCount } = calculateAverageRating(
          product.id,
          reviewsData.filter((r) => r.id != review.id)
        );
        setAverageRating(averageRating);
        setReviewCount(reviewCount);
      } catch (error) {
        console.error("Error al eliminar la reseña:", error);
      }
    }
  };

  const getProductCategoryName = (categoryId) => {
    if (categoriesData) {
      const category = categoriesData.find(
        (category) => category.id == categoryId
      );
      return category ? `${category.name}` : "Categoría no encontrada";
    }
    return "Categoría no encontrada";
  };

  const getProductSubcategoryName = (subcategoryId) => {
    if (categoriesData && product) {
      const category = categoriesData.find(
        (category) => category.id == product?.categoryId
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
          <Link to={ROUTES.CATALOGO}>Catálogo /</Link>
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          Producto /
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          {getProductCategoryName(product?.categoryId)} /
        </h1>
        <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] cursor-pointer">
          {getProductSubcategoryName(product?.subcategoryId)}
        </h1>
      </div>
      <div className="w-full flex">
        <div className="w-[60%] me-[100px]">
          <img
            className="w-[100%]"
            src={product?.imageURL}
            alt={product?.name}
          />
        </div>
        <div className="w-[40%] flex flex-col justify-center">
          <h1 className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d]">
            {getProductCategoryName(product?.categoryId)}
          </h1>
          <h1 className="textRedHatDisplayMedium font-bold text-[25px] text-[#202020] mt-[10px]">
            {product?.name}
          </h1>

          <div className="flex items-center mt-3 gap-8">
            <p className="textRedHatDisplayRegular text-[19px] tracking-[-1px] font-bold text-[#000000] ">
              ${product?.price}
            </p>
            <p className="textRedHatDisplayRegular text-[14px] tracking-[0.5px] px-3 font-bold text-[#ffffff]  bg-[#FF9500] ">
              STOCK: {product?.stock}
            </p>
          </div>

          {product?.stock > 0 && user?.role == "user" ? (
            <div className="flex flex-col">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#414141] hover:bg-[#585858]  text-[15px] text-white font-semibold py-2 px-4 mt-[60px]"
              >
                Agregar al carrito - ${product?.price}
              </button>

              <button
                onClick={() => handlePurchase(product)}
                className="bg-[#FF9500] hover:bg-[#FFB84D] text-[15px] text-white font-semibold py-2 px-4  mt-3"
              >
                Comprar ahora
              </button>
            </div>
          ) : product?.stock == 0 ? (
            <div className="flex flex-col">
              <button className="bg-[#ce3d3d] text-white font-semibold py-2 px-4 mt-[80px]">
                Agotado
              </button>
            </div>
          ) : user?.role == "admin" ? (
            <div className="flex flex-col">
              <button className="bg-[#3a3a3a] text-white font-semibold py-2 px-4 mt-[80px]">
                Imposible comprar siendo Admin
              </button>
            </div>
          ) : null}

          <div className="bg-[#eceae4] text-[14px] py-2 px-4 mt-8 flex justify-between">
            <p className="text-[#181818]">Disponibilidad Online</p>
            <p className="text-[#181818]">{product?.status.toUpperCase()}</p>
          </div>

          <div className="mt-[40px] flex flex-col gap-3 min-h-[100px] max-h-[400px] hover:text-[#2768b7]">
            <div
              className="flex justify-between items-center border-b-[1px] border-[#4d4d4d] hover:border-[#2768b7] pb-3 cursor-pointer"
              onClick={toggleDescriptionVisibility}
            >
              <button className="text-start textRedHatDisplayRegular font-semibold text-[16px] ">
                Descripción
              </button>
              {isDescriptionVisible ? (
                <FontAwesomeIcon
                  className={`text-[13px] transform transition-transform duration-300 ${
                    isDescriptionVisible ? "rotate-180" : ""
                  }`}
                  icon={faAngleDown}
                />
              ) : (
                <FontAwesomeIcon
                  className={`text-[14px] transform transition-transform duration-300 ${
                    isDescriptionVisible ? "rotate-180" : ""
                  }`}
                  icon={faAngleDown}
                />
              )}
            </div>

            {isDescriptionVisible && (
              <div className="overflow-y-auto max-h-[200px]">
                <p className="textRedHatDisplayRegular text-[16px] tracking-[-1px] text-[#4d4d4d] indent-2">
                  {product?.description}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-[10px]">
            <p className="textRedHatDisplayRegular text-[17px] tracking-[-1px] text-[#4d4d4d] mt-2">
              ★★★★★
            </p>
            <p className="textRedHatDisplayRegular text-[15px] tracking-[-1px] text-[#4d4d4d] mt-2">
              {reviewCount} reseñas
            </p>
          </div>
          {/*Poner el id del producto*/}
          <p className="textRedHatDisplayRegular text-[14px] tracking-[-1px] text-[#4d4d4d]">
            ID: {product?.id}
          </p>
        </div>
      </div>

      <div className="mt-[120px] h-[50vh]">
        {/*Te puede interesar estos productos.. */}
        {relatedProducts.length > 0 && (
          <div>
            <h1 className="textRedHatDisplayRegular text-[20px] font-bold tracking-[-1px] text-[#4d4d4d] mt-5">
              Te puede interesar estos productos..
            </h1>
            <div className="mt-10 flex justify-center">
              <RelatedProducts
                products={relatedProducts}
                onClick={handleProductClick}
                addToCart={addToCart}
                user={user}
              />
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
          {product && reviewsData.length > 0 ? (
            reviewsData
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
