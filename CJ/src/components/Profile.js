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
      className={`min-h-screen px-4 py-10 ${
        darkMode
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 text-black"
      } flex flex-col items-center`}
    >
      <div className="flex justify-between items-center w-full max-w-4xl mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
          CodeJourney 🚀
        </h1>
        <button
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 px-4 rounded-full transition duration-200 shadow"
          onClick={toggleTheme}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-lg p-6 text-center ${
          darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-300"
        }`}
      >
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-full border focus:ring-2 focus:ring-blue-500 text-black"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={fetchLeetCodeStats}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-4 rounded-full hover:scale-105 transition"
          >
            {loading.leetcode ? "Loading..." : "LeetCode"}
          </button>
          <button
            onClick={fetchCodeforcesStats}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-full hover:scale-105 transition"
          >
            {loading.codeforces ? "Loading..." : "Codeforces"}
          </button>
          <button
            onClick={fetchCodeChefStats}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-full hover:scale-105 transition"
          >
            {loading.codechef ? "Loading..." : "CodeChef"}
          </button>
        </div>
        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
        {timestamp && <p className="text-sm mt-2 text-gray-400">Last updated: {timestamp}</p>}
      </div>

      {(leetCodeImageUrl || codeforcesImageUrl || codechefData) && (
        <div className="w-full max-w-6xl mt-10 grid sm:grid-cols-3 gap-6">
          {leetCodeImageUrl && (
            <div className="relative rounded-xl overflow-hidden bg-black p-3 shadow-lg hover:scale-105 transition duration-300">
              <img
                src={leetCodeImageUrl}
                alt="LeetCode Stats"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href={`https://leetcode.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {codeforcesImageUrl && (
            <div className="relative rounded-xl overflow-hidden bg-black p-3 shadow-lg hover:scale-105 transition duration-300">
              <img
                src={codeforcesImageUrl}
                alt="Codeforces Stats"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 right-4">
                <a
                  href={`https://codeforces.com/profile/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {codechefData && (
            <div className="relative rounded-xl overflow-hidden bg-black text-white p-4 shadow-lg hover:scale-105 transition duration-300 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={codechefData.profile}
                  alt="CodeChef Profile"
                  className="w-20 h-20 rounded-full border-2 border-orange-400"
                />
                <div className="text-left space-y-1">
                  <h3 className="text-xl font-semibold text-orange-300">CodeChef Stats</h3>
                  <p className="font-medium text-lg">{codechefData.name}</p>
                  <p>⭐ {codechefData.stars} Rating: {codechefData.currentRating}</p>
                  <p>📈 Highest Rating: {codechefData.highestRating}</p>
                  <p>🌍 Global Rank: {codechefData.globalRank}</p>
                  <p>🏆 Country Rank: {codechefData.countryRank}</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <img src={codechefData.countryFlag} alt="Flag" className="w-5 h-3" />
                    <span>{codechefData.countryName}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <a
                  href={`https://www.codechef.com/users/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
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
