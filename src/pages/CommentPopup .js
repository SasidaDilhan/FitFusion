import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";

const CommentPopup = ({ postId, onClose }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommentService.getComments(postId);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic to save comment using PostService or similar
      // You can handle saving comments here
      // After saving, you may want to close the popup
      // Example:
      // await PostService.addComment(postId, comment);
      onClose();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      // Logic to delete comment using CommentService or similar
      // Example:
      // await CommentService.deleteComment(commentId);
      // After deleting, you may want to fetch comments again to update the UI
      const response = await CommentService.getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = async (commentId, editedComment) => {
    try {
      // Logic to edit comment using CommentService or similar
      // Example:
      // await CommentService.editComment(commentId, editedComment);
      // After editing, you may want to fetch comments again to update the UI
      const response = await CommentService.getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleStartEditing = (commentId, initialCommentText, e) => {
    e.stopPropagation(); // Stop propagation to prevent closing the popup
    setEditingCommentId(commentId);
    setEditedCommentText(initialCommentText);
  };

  const handleCancelEditing = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleSaveEditing = async (commentId) => {
    try {
      await handleEdit(commentId, editedCommentText);
      setEditingCommentId(null);
      setEditedCommentText("");
    } catch (error) {
      console.error("Error saving edited comment:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4 w-[500px]">Add Comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={handleChange}
            placeholder="Enter your comment..."
            className="w-full border rounded-md p-2 mb-4"
          />
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Comment History</h3>
            {comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <div className="flex gap-3 items-center">
                  <img
                    className="w-[30px] h-[30px] rounded-full"
                    src={comment.user.profilePictureUrl}
                  />
                  <span className="font-bold">
                    {comment.user.firstName} {comment.user.lastName}
                  </span>
                </div>
                {editingCommentId === comment.id ? (
                  <div className="mt-1">
                    <input
                      type="text"
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className="w-full border rounded-md p-2"
                    />
                    <div className="mt-2">
                      <button
                        className="text-blue-500 mr-2"
                        onClick={() => handleSaveEditing(comment.id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-500"
                        onClick={handleCancelEditing}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1">{comment.commentText}</div>
                )}
                <div className="mt-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={(e) =>
                      handleStartEditing(
                        comment.id,
                        comment.commentText,
                        e
                      )} // Pass event object to stop propagation
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {comments.length === 0 && <p>No comments yet.</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentPopup;
