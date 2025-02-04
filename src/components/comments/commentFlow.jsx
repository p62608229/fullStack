import React, { useState } from 'react';
import { useSelector } from "react-redux";
import '../../css/CommentsFlow.css';
import { Rating } from 'primereact/rating';
import 'primereact/resources/primereact.min.css';  // קובץ CSS של PrimeReact
import 'primeicons/primeicons.css'; // קובץ ה-

export const CommentsFlow = () => {
  const allComments = useSelector(state => state.comments.comments);
  console.log("*************", allComments); // הדפסת כל התגובות מהסטור

  // מצב למעקב אחרי התגובה הנוכחית
  const [currentIndex, setCurrentIndex] = useState(0);

  // פונקציה למעבר לתגובה קודמת
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // פונקציה למעבר לתגובה הבאה
  const goToNext = () => {
    if (currentIndex < allComments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentComment = allComments[currentIndex]; // התגובה הנוכחית

  return (
    <div className="comments-container">
      {/* כפתור חץ שמאלה */}
      <button 
        className="prev-arrow" 
        onClick={goToPrev} 
        disabled={currentIndex === 0} // השבתת כפתור אם אנחנו בתגובה הראשונה
      >
        ←
      </button>

      {/* הצגת התגובה הנוכחית */}
      <div className="comment">
        {/* שם המגיב */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <h3 style={{ marginRight: '10px' }}>{currentComment?.namecomment}</h3>

          {/* הצגת דירוג אם קיים */}
          {currentComment?.rating !== undefined && (
            <div className="rating-container">
              <Rating value={currentComment.rating} readOnly stars={5} cancel={false} />
              <span>({currentComment.rating})</span>
            </div>
          )}
        </div>

        {/* הצגת תוכן התגובה */}
        <h2>{currentComment?.contentCommentv}</h2>
      </div>

      {/* כפתור חץ ימינה */}
      <button 
        className="next-arrow" 
        onClick={goToNext} 
        disabled={currentIndex === allComments.length - 1} // השבתת כפתור אם אנחנו בתגובה האחרונה
      >
        →
      </button>
    </div>
  );
};
