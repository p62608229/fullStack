import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Rating } from 'primereact/rating'; // יוּבא את רכיב הדירוג מ-PrimeReact
import '../../css/commentsTabel.css';

export const CommentsTable = (props) => {

  const location = useLocation();
  const { id } = location.state || props;
  const allComments = useSelector(state => state.comments.comments);
  const commentsToShow = id ? allComments.filter(c => c.id == id) : allComments;

  return (
    <>
      <h2>Show all comments table</h2>
      {/* הצגת תגובות */}
      {commentsToShow.map(c => (
        <div key={c.id} style={{ marginBottom: '20px' }}>
          <div>
            <strong>{c.namecomment}</strong> : {c.contentCommentv}
          </div>
          
          {/* הצגת דירוג כוכבים */}
          {c.rating !== undefined && (
            <div style={{ marginTop: '5px' }}>
              <Rating value={c.rating} readOnly stars={5} cancel={false} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
