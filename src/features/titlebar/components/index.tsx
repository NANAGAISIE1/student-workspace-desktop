import { Link } from "@tanstack/react-router";

type Props = {};

const TitleBar = (props: Props) => {
  return (
    <div className="p-2 flex gap-2" data-tauri-drag-region>
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
  );
};

export default TitleBar;
