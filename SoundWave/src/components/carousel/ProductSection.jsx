import { useState } from "react";
import "./ProductSection.css";
import parlante1 from "../../assets/images/Marshall_Acton_BT.png";
import parlante2 from "../../assets/images/Boss.png";

const products = [
  {
    id: 1,
    name: "Marshall Acton BT 700",
    description: "Equipado con altavoces de 2.0 canales y amplificadores de clase D, ofrece un sonido envolvente con graves profundos y agudos nítidos. Este altavoz tiene una potencia de 60W y cuenta con controles analógicos de volumen, agudos y graves para personalizar el sonido a tu gusto.",
    review: "Con una impresionante capacidad de graves y una claridad cristalina en todas las frecuencias, es perfecto para quienes buscan un dispositivo elegante que no comprometa el rendimiento.",
    image: parlante1,
    carouselImages: [parlante1, parlante2],
    rating: 3
  },
  {
    id: 3,
    name: "Bose QuietComfort 35 II",
    description: "Los auriculares Bose QuietComfort 35 II ofrecen cancelación de ruido líder en la industria, sonido claro y una comodidad excepcional. Ideales para viajes largos, trabajo y cualquier ambiente que requiera aislamiento acústico.",
    review: "Los Bose QuietComfort 35 II son perfectos para quienes buscan una experiencia de sonido inmersiva y sin distracciones, con una excelente duración de batería y confort durante horas de uso.",
    image: parlante2,
    carouselImages: [parlante1, parlante2], // Aquí puedes añadir más imágenes
    rating: 5
  },
];

export function ProductSection() {
  const [currentProductId, setCurrentProductId] = useState(products[0].id);

  // Encuentra el producto seleccionado en función de su ID
  const currentProduct = products.find(product => product.id === currentProductId);

  // Función para actualizar el producto al hacer clic en una imagen del carrusel
  const handleCarouselClick = (productId) => {
    setCurrentProductId(productId);
  };

  // Suponiendo que currentProduct.rating contiene un número entre 0 y 5
  const rating = currentProduct.rating || 0;

  // Crear un array con 5 estrellas, algunas rellenas (en base al rating)
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index < rating ? 'filled' : 'empty';
  });

  return (
    <div className="product-container">
      <div className="product-section">
        {/* Información principal del producto */}
        <div className="product-info">
          <div className="product-review text-end">
          <h2 className="textRedHatDisplayMedium font-bold text-white">Review</h2>
            <div className="stars">
              {stars.map((star, index) => (
                <span key={index} className={`star ${star}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="textOpenSansRegular leading-7 text-[15px]">"{currentProduct.review}"</p>
          </div>
          <div className="product-image">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="carousel-image"
            />
            
          </div>
          <div className="product-description">
            <h2 className="textRedHatDisplayMedium font-bold text-white">{currentProduct.name}</h2>
            <p className="textOpenSansRegular leading-7 text-[15px]" style={{ textIndent: "30px" }}>{currentProduct.description}</p>
          </div>
        </div>

        {/* Carrusel */}
        <div className="carousel">
          {products.map((product) => (
            <img
              key={product.id}
              src={product.image}
              alt={product.name}
              onClick={() => handleCarouselClick(product.id)}
              className="carousel-images"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
