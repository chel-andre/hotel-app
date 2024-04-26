import { Link } from "react-router-dom";
import errorImage from "../assets/error.png"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Uh oh! Page not found.</h1>
        <p className="text-gray-700 mb-6">
          Looks like you've stumbled upon a path that doesn't exist. Don't worry,
          we've got you covered!
        </p>
        <img src={errorImage} alt="404 Illustration" className="mx-auto mb-6" />
        <Link to={"/"} className="inline-block px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
