import { useSelector } from "react-redux";
import { Galleria } from 'primereact/galleria';
import '../../css/CommentsFlow.css'; // Import CSS file for styling

export const CommentsFlow = () => {
    
    const allComments = useSelector(state => state.comments.comments);
    
    // Transform comments into items expected by Galleria component
    const items = allComments.map((comment, index) => ({
        key: index,
        // image: '', // You can provide an image if needed
        content: (
            <div className="comment" style={{margin: "20px"}}>
                <div className="content"><h2>{comment.contentCommentv}</h2></div>
                <div className="name"><h5>{comment.namecomment}</h5></div>
            </div>
        )
    }));

    // Custom style for Galleria component
    const galleriaStyle = {
        backgroundColor: 'black' // Change this to your desired background color
    };

    return (
        // <Galleria value={items} numVisible={1} item={renderItem} style={galleriaStyle}/>

        <Galleria value={items}  numVisible={5} circular
        showItemNavigators 
        showThumbnails={false} item={renderItem}   />
    );
};

// Custom renderItem function for Galleria component
const renderItem = (item) => {
    return item.content;
};
