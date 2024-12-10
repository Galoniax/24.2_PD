// src/components/Review/ReviewForm.jsx
import React, { useState } from 'react';
import { createReview } from '../../services/reviewService';

const ReviewForm = ({ productId, user, onChange }) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5); 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newReview = {
      userId: user.id,
      productId: productId,
      title,
      comment,
      rating
    };

    try {
        // Crear reseña en el servidor
        const review = await createReview(newReview);
  
        // Limpiar los campos del formulario
        setTitle('');
        setComment('');
        setRating(5);
  
        // Actualizar el componente padre y consultar las reseñas
        onChange(review);
  
        // Actualizar el promedio y la cantidad de reseñas
      

        
  
      } catch (error) {
        console.error("Error al enviar la reseña", error);
      }
  };

  return (
    <div className="review-form mb-[100px]">
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder='Título de la reseña'
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-[15px] p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="comment" className="block text-sm font-medium">Comentario</label>
          <textarea
            id="comment"
            value={comment}
            placeholder='Comentario de la reseña'
            onChange={(e) => setComment(e.target.value)}
            onInput={(e) => {
              e.target.style.height = "auto"; // Resetea la altura para recalcular
              e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
            }}
            className="w-full text-[15px] p-2 border rounded mt-1 resize-none overflow-hidden"
            rows="1" 
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="rating" className="block text-sm font-medium">Puntuación</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full text-[15px] p-2 border rounded mt-1 text-[#969696]"
            required
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option className='text-[#969696] text-[15px]' key={rate} value={rate}>
                {rate} {rate === 1 ? 'estrella' : 'estrellas'}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="mt-[30px] p-2 w-full font-bold bg-[#ff8928] hover:bg-[#c5c5c5] text-white rounded">
          Enviar reseña
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
