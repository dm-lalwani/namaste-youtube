import Button from "./Button";

const list = ["All", "Music", "Sports", "Gaming", "News", "Movies", "Live", "Fashion", "Learning", "Spotlight", "360° Video"];

const ButtonList = () => {
  return (
      <div className="flex gap-x-3">
        {list.map((item) => (
            <Button key={item} name={item} />
        ))}
    </div>
  )
}

export default ButtonList