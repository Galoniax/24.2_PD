import React from "react";
import { useState } from "react";

const CategoryModal = ({
  category,
  onClose,
  onSave,
  onDelete,
  onCreate,
  isEdit,
  isCreate,
}) => {
  const [name, setName] = useState(category ? category.name : "");
  const [subcategoriesInput, setSubcategoriesInput] = useState([1]);
  const [subcategories, setSubcategories] = useState(
    subcategoriesInput.map(() => ({ value: "" }))
  );

  const handleAddInput = () => {
    setSubcategoriesInput([...subcategoriesInput, 1]);
    setSubcategories((prevSubcategories) => [
      ...prevSubcategories,
      { value: "" },
    ]);
  };

  const handleRemoveInput = () => {
    if (subcategoriesInput.length > 1) {
      setSubcategoriesInput(subcategoriesInput.slice(0, -1));
      setSubcategories(subcategories.slice(0, -1));
    }
  };


  if (!isCreate && !isEdit && !category) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#222222] p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {isCreate
            ? "Crear Categoria"
            : isEdit
              ? "Editar Categoria"
              : "Eliminar Categoria"}
        </h2>

        {isCreate || isEdit ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (isCreate) {
                    const subcategoriesArray = subcategories.map((sub) => sub.value.trim());
                    onCreate(name, subcategoriesArray); // Enviar datos limpios
                  } else if (isEdit) {
                    onSave(category.id, name, subcategories);
                  }
                  onClose();
                }}
              >
                <label className="textRedHatDisplayMedium text-[14px] block mb-1 mt-4 text-white">
                  Nombre
                  <input
                    type="text"
                    required
                    value={name}
                    minLength={3}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingrese el nombre de la categoria"
                    className="border py-1 px-3 rounded w-full text-[14px] text-[#272727]"
                  />
                </label>

                <div className="grid grid-cols-4 gap-5">
                  {subcategoriesInput.map((_, index) => (
                    <div key={index} className="flex flex-col gap-1 mt-4">
                      <label className="textRedHatDisplayMedium text-[13px] block mb-1  text-white">
                        Subcategoria {index + 1}
                      </label>
                      <input
                        type="text"
                        value={subcategories[index].value}
                        onChange={(e) => {
                          const newSubcategories = [...subcategories];
                          newSubcategories[index].value = e.target.value;
                          setSubcategories(newSubcategories);
                        }}
                        required
                        placeholder="Ingrese el nombre de la subcategoria"
                        className="border py-1 px-3 rounded w-full text-[14px] text-[#272727]"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mb-9">
                  <div className="w-1/2">
                    <button
                      type="button"
                      onClick={handleAddInput}
                      className={`textRedHatDisplayRegular text-[16px] border w-full p-1 px-2 rounded-md mt-6 me-2 bg-[#79DA52] text-white border-none font-bold`}
                    >
                      +
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      type="button"
                      onClick={handleRemoveInput}
                      className={`textRedHatDisplayRegular text-[16px] border w-full p-1 px-2 rounded-md mt-6 me-2 bg-[#da5252] text-white border-none font-bold`}
                    >
                      -
                    </button>
                  </div>
                </div>

                {isCreate ? (
                  <button
                    type="submit"
                    className="textRedHatDisplayRegular text-[16px] border w-full p-1 px-2 rounded-md mt-8 bg-[#79DA52] text-white border-none font-bold"
                  >
                    Crear
                  </button>
                ) : isEdit ? (
                  <button
                    type="submit"
                    className="textRedHatDisplayRegular text-[#838387] font-semibold indent-0"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="textRedHatDisplayRegular text-[#838387] font-semibold indent-0"

                  >
                    Eliminar
                  </button>
                )}
                <button
                  className="textRedHatDisplayRegular text-[16px] border w-full p-1 px-2 rounded-md mt-5 bg-[#525252] text-white border-none font-bold"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <p>
              ¿Estás seguro de que deseas eliminar la categoria "{category.name}"?
            </p>
            <div className="mt-9 flex justify-end space-x-2">
              <button
                onClick={() => {
                  onDelete(category);
                  onClose();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Confirmar
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
