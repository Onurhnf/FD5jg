import Image from "next/image";

function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Image"
            width={60}
            height={39}
            className="object-cover"
          />
        </div>

        <div className="flex justify-center flex-grow px-28">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md w-full "
          />
        </div>

        <button className="px-4 py-2 text-white bg-red-500 rounded-md">
          Logout
        </button>
      </header>

      <div className="h-64 bg-cover bg-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to our Website</h2>
          <p className="text-xl">Discover amazing categories and more!</p>
        </div>
      </div>
    </>
  );
}

export default Header;
