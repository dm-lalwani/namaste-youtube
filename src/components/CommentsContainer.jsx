import React, { useState } from "react";

const initialComments = [
  {
    id: 1,
    name: "TechSphere",
    time: "2 hours ago",
    text: "This explanation of closures finally made it click. Thanks a ton!",
    likes: 254,
    repliesCount: 5,
    replies: [
      {
        id: 2,
        name: "CodeWithDinesh",
        time: "1 hour ago",
        text: "Same here, that counter example was 🔥",
        likes: 72,
        repliesCount: 2,
        replies: [
          {
            id: 3,
            name: "Frontend Ninja",
            time: "45 minutes ago",
            text: "I paused and rewound that part like 3 times 😂",
            likes: 19,
            repliesCount: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Dev Journey",
    time: "5 hours ago",
    text: "Imagine having this quality of content when we were starting out.",
    likes: 601,
    repliesCount: 12,
    replies: [],
  },
  {
    id: 5,
    name: "PixelPerfect UI",
    time: "1 day ago",
    text: "The timestamps in the description are a lifesaver, thank you!",
    likes: 143,
    repliesCount: 3,
    replies: [],
  },
];

// Single comment (YouTube-like)
const Comment = ({ data, onToggleReplies, isRepliesOpen }) => {
  const { id, name, text, time, likes, repliesCount, replies } = data;

  return (
    <div className="flex gap-3 py-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        {/* Name + time */}
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-semibold">{name}</span>
          {time && <span className="text-xs text-gray-500">{time}</span>}
        </div>

        {/* Text */}
        <p className="text-sm mt-1">{text}</p>

        {/* Actions row */}
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
          <button className="flex items-center gap-1 hover:text-black">
            <span>👍</span>
            {likes ? <span>{likes}</span> : null}
          </button>
          <button className="hover:text-black">Reply</button>
        </div>

        {/* View / hide replies */}
        {replies && replies.length > 0 && (
          <button
            onClick={() => onToggleReplies(id)}
            className="mt-2 flex items-center gap-1 text-xs text-blue-600"
          >
            <span className="text-sm">{isRepliesOpen ? "▴" : "▾"}</span>
            <span>
              {isRepliesOpen ? "Hide" : "View"} {repliesCount || replies.length}{" "}
              {repliesCount === 1 ? "reply" : "replies"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

// Recursive list
const CommentsList = ({ comments, openMap, onToggleReplies }) => {
  if (!comments || comments.length === 0) return null;

  return (
    <div>
      {comments.map((comment) => {
        const isRepliesOpen = !!openMap[comment.id];

        return (
          <div key={comment.id}>
            <Comment
              data={comment}
              isRepliesOpen={isRepliesOpen}
              onToggleReplies={onToggleReplies}
            />

            {/* Nested replies when open */}
            {comment.replies && comment.replies.length > 0 && isRepliesOpen && (
              <div className="pl-6 border-l border-gray-200 ml-4">
                <CommentsList
                  comments={comment.replies}
                  openMap={openMap}
                  onToggleReplies={onToggleReplies}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CommentsContainer = () => {
  const [comments, setComments] = useState(initialComments);
  // which comment ids have their replies open
  const [openReplies, setOpenReplies] = useState({});
  const [newComment, setNewComment] = useState("");

  // toggle “View replies / Hide replies”
  const handleToggleReplies = (id) => {
    setOpenReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // add a new top-level comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      name: "You",
      time: "Just now",
      text: newComment.trim(),
      likes: 0,
      repliesCount: 0,
      replies: [],
    };

    // prepend like YouTube (newest on top)
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Comments{" "}
        <span className="text-sm text-gray-500">({comments.length})</span>
      </h2>

      {/* Add comment input */}
      <form onSubmit={handleAddComment} className="flex gap-3 items-start mb-4">
        <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          <img
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="You"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={1}
            className="w-full border-b border-gray-300 focus:border-gray-500 outline-none text-sm resize-none pb-1"
          />
          <div className="flex justify-end gap-2 mt-2 text-sm">
            <button
              type="button"
              onClick={() => setNewComment("")}
              className="px-3 py-1 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-1 rounded-full bg-blue-600 text-white disabled:bg-blue-300"
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      {/* Recursive comments list */}
      <CommentsList
        comments={comments}
        openMap={openReplies}
        onToggleReplies={handleToggleReplies}
      />
    </section>
  );
};

export default CommentsContainer;
