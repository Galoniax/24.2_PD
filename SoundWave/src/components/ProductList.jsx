import React from "react";

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-gray-500">No hay productos que coincidan con los filtros seleccionados.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-blue-500 font-semibold mt-2">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;