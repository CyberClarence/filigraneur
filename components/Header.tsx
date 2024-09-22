export default function Header() {
  return (
    <div className="w-full items-center justify-center">
      <div className="flex items-center justify-center   mb-2 sm:mb-3 ">
        <svg className="w-8 h-8 mr-2" viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#002395" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center flex items-center justify-center">
          Filigraneur.fr
        </h1>
      </div>
      <h2 className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 text-center items-center justify-center gap-[5px] ">
        <span className="block sm:inline">Version </span>

        <span className="block sm:inline">
          <a
            href="https://github.com/cyberclarence/filigraneur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline underline"
          >
            Opensource
          </a>{" "}
          et <span className="text-red-500">Sécurisée</span>{" "}
        </span>
        <span className="block sm:inline">du site du gouvernement</span>
      </h2>
    </div>
  );
}
