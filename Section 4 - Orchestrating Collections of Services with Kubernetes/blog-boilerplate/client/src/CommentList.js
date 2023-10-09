export default function CommentList({comments}){    
    const renderComments = comments.map(comment=>{
        let content;
        switch(comment.status){
            case 'approved':
                content = comment.content;
                break;
            case 'rejected':
                content = 'Comment has been rejected';
                break;
            case 'pending':
                content = 'Comment is waiting for moderation';
                break;
            default:
                content = 'None';

        }
        return <li key={comment.id}>{content}</li>;
    })

    return <div>
        <ul>
            {renderComments}
        </ul>
    </div>
}