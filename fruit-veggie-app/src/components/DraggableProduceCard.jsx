import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';

function DraggableProduceCard({ produce }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: produce._id,
    data: {
      type: 'produce',
      produce: produce,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`produce-card draggable ${isDragging ? 'dragging' : ''}`}
    >
      <div 
        className="drag-handle"       
        {...listeners}
        {...attributes}
      >⋮⋮</div>
      
      {/* <img src={produce.imageUrl} alt={produce.name} /> */}
      <img 
        src={produce.imageUrl || '/default-produce.png'} 
        alt={produce.name}
        onError={(e) => {
          e.target.src = '/default-produce.png';
        }}
      />
      <h2>{produce.name}</h2>
      <p>Category: {produce.category}</p>
      <div className="nutrition-preview">
        <small>
          {produce.nutrition.calories} cal | 
          {produce.nutrition.protein}g protein | 
          {produce.nutrition.fiber}g fiber
        </small>
      </div>
      <Link 
        to={`/detail/${produce._id}`} 
        className="details-link"
        onClick={(e) => e.stopPropagation()} // Prevent drag when clicking link
      >
        View Details
      </Link>
    </article>
  );
}

export default DraggableProduceCard;