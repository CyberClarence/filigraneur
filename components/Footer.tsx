"use server";
export default async function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-gray-600">
      Fait avec ❤️ par CyberClarence |{" "}
      <a
        href="https://x.com/webclarence"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        cyber-clarence.fr
      </a>
    </footer>
  );
}
