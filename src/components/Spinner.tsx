import { Icons } from "./Icons";

const Spinner = () => {
    return (
      <div role="status">
        <Icons.spinner />
        <span className="sr-only">Loading...</span>
      </div>
    );
}

export default Spinner