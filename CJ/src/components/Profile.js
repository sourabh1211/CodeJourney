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
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-r from-white via-gray-100 to-white text-black"
      } p-6`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
          CodeJourney 🚀
        </h1>
        <button
          onClick={toggleTheme}
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold transition-transform duration-300 hover:scale-105"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
        {/* LEFT SIDE */}
        <div
          className={`p-8 rounded-2xl shadow-2xl border transition duration-500 ${
            darkMode
              ? "bg-black bg-opacity-50 border-white/10"
              : "bg-white bg-opacity-90 border-black/10"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Enter Your Username</h2>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-full mb-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex flex-col gap-4">
            <button
              onClick={fetchLeetCodeStats}
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-4 rounded-full transition-transform duration-300 hover:scale-105"
            >
              {loading.leetcode ? "Loading..." : "LeetCode"}
            </button>
            <button
              onClick={fetchCodeforcesStats}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-full transition-transform duration-300 hover:scale-105"
            >
              {loading.codeforces ? "Loading..." : "Codeforces"}
            </button>
            <button
              onClick={fetchCodeChefStats}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-4 rounded-full transition-transform duration-300 hover:scale-105"
            >
              {loading.codechef ? "Loading..." : "CodeChef"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {timestamp && <p className="text-sm mt-2 text-gray-400">Last updated: {timestamp}</p>}
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-0 top-0 h-full w-px bg-gray-400/30" />

          <div className="flex flex-col gap-6 pl-0 lg:pl-10">
            {/* Top: Codeforces + CodeChef */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codeforcesImageUrl && (
                <div className="bg-black rounded-xl overflow-hidden border shadow-lg p-3 hover:scale-105 transition duration-300">
                  <img src={codeforcesImageUrl} alt="Codeforces Stats" className="w-full h-64 object-contain" />
                  <a
                    href={`https://codeforces.com/profile/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-md"
                  >
                    View Codeforces
                  </a>
                </div>
              )}
             {codechefData && (
  <div className="relative min-h-[340px] rounded-xl overflow-hidden border bg-black p-4 text-white shadow-[0_0_25px_#f97316] hover:scale-105 transition duration-300 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img
        src={codechefData.profile}
        alt="Profile"
        className="w-20 h-20 rounded-full border-2 border-orange-400"
      />
      <div className="text-left space-y-2">
      <h3 className="text-2xl font-bold text-amber-800 text-left">CodeChef Stats</h3>
        <p className="text-lg font-bold">{codechefData.name}</p>
        <p className="text-lg">⭐{codechefData.stars}Rating:{codechefData.currentRating}</p>
        <p className="text-lg">📈Highest Rating:{codechefData.highestRating}</p>
        <p className="text-lg">🌍Global Rank:{codechefData.globalRank}</p>
        <p className="text-lg">🏆Country Rank:{codechefData.countryRank}</p>
        <div className="flex items-center space-x-2">
          <img src={codechefData.countryFlag} alt="Country Flag" className="w-6 h-4" />
          <span className="text-sm">{codechefData.countryName}</span>
        </div>
      </div>
    </div>
    <div className="absolute bottom-4 right-4">
      <a 
        href={`https://www.codechef.com/users/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
      >
        View Profile
      </a>
    </div>
  </div>
)}
  </div>
            {leetCodeImageUrl && (
              <div className="bg-black rounded-xl overflow-hidden border shadow-lg p-4 hover:scale-105 transition duration-300">
                <img src={leetCodeImageUrl} alt="LeetCode Stats" className="w-full" />
                <a
                  href={`https://leetcode.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-md"
                >
                  View LeetCode
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
