import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const RelatedProducts = ({ products, onClick, addToCart, user }) => {
  return (
    <div id="relatedProducts" className="flex overflow-x-auto gap-x-4 gap-y-6">
      {products.map((relatedProduct) => (
        <div
          key={relatedProduct.id}
          className="border w-[240px] rounded-lg p-4 shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={relatedProduct.imageURL}
            alt={relatedProduct.name}
            className="w-full h-[150px] object-cover rounded-md mb-4"
          />
          <h2 className="textRedHatDisplayMedium text-[16px] font-bold text-[#5a5a5a]">
            {relatedProduct.name}
          </h2>
          <div className="flex mt-2">
            <p className="text-sm text-gray-600 ">${relatedProduct.price}</p>
            <p className="text-sm text-white bg-[#FF9500] font-semibold px-2 ms-10">Stock: {relatedProduct.stock}</p>
          </div>
          <div className="flex justify-center gap-1">
            <button
              onClick={() => onClick(relatedProduct)}
              className="bg-[#414141] hover:bg-[#585858] w-[75%] mt-5 text-white font-semibold py-1 px-3"
            >
              Ver producto
            </button>
            {user?.role == "user" && (
              <button
                onClick={() => addToCart(relatedProduct)}
                className="bg-[#FF9500] hover:bg-[#f88d46] mt-5 w-[25%] flex items-center justify-center text-white font-semibold py-1 px-3"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <p className="ml-1 font-bold">+</p>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
