// src/components/Review/ReviewForm.jsx
import React, { useState } from 'react';
import { useReviews } from '../../hooks/useReviews';

const ReviewForm = ({ productId, user, onChange }) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5); 

  const { createReview } = useReviews();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newReview = {
      userId: parseInt(user.id),
      productId: parseInt(productId),
      title,
      comment,
      rating,
      date: new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    try {
        // Crear reseña en el servidor
        await createReview(newReview);
  
        // Limpiar los campos del formulario
        setTitle('');
        setComment('');
        setRating(5);
  
        // Actualizar las reseñas en el componente padre
        onChange(newReview);
  
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
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="comment" className="block text-sm font-medium">Comentario</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="rating" className="block text-sm font-medium">Puntuación</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded mt-1"
            required
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
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
