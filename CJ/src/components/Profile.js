
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
      className={`min-h-screen p-6 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-black"
      } flex flex-col items-center`}
    >
      <div className="flex justify-between items-center w-full max-w-3xl mb-10">
        <h1
          className={`text-4xl sm:text-5xl font-extrabold ${
            darkMode
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg"
              : "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 drop-shadow-md"
          }`}
        >
          CodeJourney 🚀
        </h1>
        <button
          className="text-black bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-full text-sm font-semibold shadow transition-transform duration-300 hover:scale-105"
          onClick={toggleTheme}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div
        className={`${
          darkMode
            ? "bg-black bg-opacity-60 border-white/10 text-white"
            : "bg-white bg-opacity-90 border-black/10 text-black"
        } backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-2xl text-center border`}
      >
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-6 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-600"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={fetchLeetCodeStats}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
          >
            {loading.leetcode ? "Loading..." : "LeetCode"}
          </button>
          <button
            onClick={fetchCodeforcesStats}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
          >
            {loading.codeforces ? "Loading..." : "Codeforces"}
          </button>
          <button
            onClick={fetchCodeChefStats}
            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-300 hover:to-red-400 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
          >
            {loading.codechef ? "Loading..." : "CodeChef"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {timestamp && <p className="text-sm mt-2 text-gray-400">Last updated: {timestamp}</p>}
      </div>

      {(leetCodeImageUrl || codeforcesImageUrl || codechefData) && (
        <div className="w-full max-w-5xl mt-10 grid sm:grid-cols-3 gap-6 text-center">
          {leetCodeImageUrl && (
            <div className="relative min-h-[300px] rounded-xl overflow-hidden border bg-black p-2 shadow-[0_0_25px_#f59e0b] hover:scale-105 transition duration-300">
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
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {codeforcesImageUrl && (
            <div className="relative min-h-[300px] rounded-xl overflow-hidden border bg-black p-2 shadow-[0_0_25px_#8b5cf6] hover:scale-105 transition duration-300">
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
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                  View Profile
                </a>
              </div>
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
      )}
    </div>
  );
};
export default Profile;
