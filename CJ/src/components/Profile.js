import React, { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [leetCodeImageUrl, setLeetCodeImageUrl] = useState("");
  const [codeforcesImageUrl, setCodeforcesImageUrl] = useState("");
  const [codechefData, setCodechefData] = useState(null);
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState({
    leetcode: false,
    codeforces: false,
    codechef: false,
  });

  const updateTimestamp = () => {
    const now = new Date();
    setTimestamp(now.toLocaleString());
  };

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const fetchLeetCodeStats = () => {
    if (!username) return showError("Please enter a LeetCode username");
    setLoading((prev) => ({ ...prev, leetcode: true }));
    setLeetCodeImageUrl(
      `https://leetcard.jacoblin.cool/${username}?theme=${
        darkMode ? "dark" : "light"
      }&font=Ubuntu&cache=14400&ext=contest`
    );
    updateTimestamp();
    setError("");
    setTimeout(() => setLoading((prev) => ({ ...prev, leetcode: false })), 1000);
  };

  const fetchCodeforcesStats = () => {
    if (!username) return showError("Please enter a Codeforces username");
    setLoading((prev) => ({ ...prev, codeforces: true }));
    setCodeforcesImageUrl(
      `https://codeforces-readme-stats.vercel.app/api/card?username=${username}`
    );
    updateTimestamp();
    setError("");
    setTimeout(() => setLoading((prev) => ({ ...prev, codeforces: false })), 1000);
  };

  const fetchCodeChefStats = async () => {
    if (!username) return showError("Please enter a CodeChef username");
    setLoading((prev) => ({ ...prev, codechef: true }));
    try {
      const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
      const data = await response.json();
      if (data.currentRating) {
        setCodechefData(data);
        updateTimestamp();
        setError("");
      } else {
        showError("CodeChef username not found.");
      }
    } catch {
      showError("Failed to fetch CodeChef stats.");
    }
    setLoading((prev) => ({ ...prev, codechef: false }));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (leetCodeImageUrl && username) {
      setLeetCodeImageUrl(
        `https://leetcard.jacoblin.cool/${username}?theme=${
          !darkMode ? "dark" : "light"
        }&font=Ubuntu&cache=14400&ext=contest`
      );
    }
  };

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden grid grid-cols-1 md:grid-cols-2 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      }`}
    >
      {/* LEFT SIDE - Input Section */}
      <div className="p-6 flex flex-col items-center gap-10 border-r border-gray-500">
        <h1
          className={`text-4xl font-extrabold text-center ${
            darkMode
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              : "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500"
          }`}
        >
          CodeJourney 🚀
        </h1>

        <button
          onClick={toggleTheme}
          className={`px-5 py-2 rounded-full font-semibold shadow ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-yellow-400 hover:bg-yellow-300 text-black"
          }`}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full max-w-sm p-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-sm">
          <button
            onClick={fetchLeetCodeStats}
            className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-full"
          >
            {loading.leetcode ? "Loading..." : "LeetCode"}
          </button>
          <button
            onClick={fetchCodeforcesStats}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-full"
          >
            {loading.codeforces ? "Loading..." : "Codeforces"}
          </button>
          <button
            onClick={fetchCodeChefStats}
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-full"
          >
            {loading.codechef ? "Loading..." : "CodeChef"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {timestamp && <p className="text-sm text-gray-400">Last updated: {timestamp}</p>}
      </div>

      {/* RIGHT SIDE - Stats Section */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
        {leetCodeImageUrl && (
          <div className="col-span-2 relative rounded-xl overflow-hidden border bg-black p-2 shadow-md w-full max-w-[500px]">
            <img
              src={leetCodeImageUrl}
              alt="LeetCode Stats"
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href={`https://leetcode.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {codeforcesImageUrl && (
          <div className="relative rounded-xl overflow-hidden border bg-black p-2 shadow-md w-full max-w-[500px]">
            <img
              src={codeforcesImageUrl}
              alt="Codeforces Stats"
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-4 right-4">
              <a
                href={`https://codeforces.com/profile/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {codechefData && (
          <div className="relative rounded-xl overflow-hidden border bg-black p-4 text-white shadow-md w-full max-w-[500px] flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={codechefData.profile}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-orange-400"
              />
              <div>
                <h3 className="text-xl font-bold">{codechefData.name}</h3>
                <p className="text-sm text-gray-300">{codechefData.institution}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p><strong>Rating:</strong> {codechefData.currentRating}</p>
              <p><strong>Stars:</strong> {codechefData.stars}</p>
              <p><strong>Max Rating:</strong> {codechefData.highestRating}</p>
              <p><strong>Global Rank:</strong> {codechefData.globalRank}</p>
              <p><strong>Country Rank:</strong> {codechefData.countryRank}</p>
            </div>
            <div className="self-end">
              <a
                href={`https://www.codechef.com/users/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
              >
                View Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
