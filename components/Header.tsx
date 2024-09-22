export default function Header() {
  return (
    <div className="w-full text-center ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-gray-900 text-center flex items-center justify-center">
        <svg className="w-8 h-8 mr-2" viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#002395" />
          <rect width="1" height="2" x="1" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
        Filigraneur.fr
      </h1>
      <h2 className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 text-center flex items-center justify-center gap-[5px]">
        <span>
          <a
            href="https://github.com/cyberclarence/filigraneur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open-source
          </a>
        </span>
        et<span>sécurisé</span>
      </h2>
    </div>
  );
}
