function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
      <p className="text-gray-500 mt-2">
        This is not a fault, just an accident that was not intentional.
      </p>
      <a href="/" className="mt-4 px-4 py-2 cursor-pointer text-white rounded">
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
