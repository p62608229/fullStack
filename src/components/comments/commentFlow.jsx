import React from 'react';
import { useSelector } from "react-redux";
import { Galleria } from 'primereact/galleria';
import '../../css/home.css';

export const CommentsFlow = () => {
  const allComments = useSelector(state => state.comments.comments);

  const items = allComments.map((comment, index) => ({
    key: index,
    content: (
      <div className="comment">
        <h2>{comment.contentCommentv}</h2>
        <h5>{comment.namecomment}</h5>
      </div>
    )
  }));

  return (
    <Galleria value={items} numVisible={5} circular showItemNavigators showThumbnails={false} item={renderItem} />
  );
};

const renderItem = (item) => {
  return item.content;
};