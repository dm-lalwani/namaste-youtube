const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start gap-2 px-2 py-1 text-sm hover:bg-gray-50">
      <div className="w-7 h-7 rounded-full bg-gray-300 overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover"
          alt={name}
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-xs mr-1">{name}</span>
        <span className="text-sm wrap-break-word">{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
