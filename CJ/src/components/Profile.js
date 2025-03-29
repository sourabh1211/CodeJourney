import React, { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [leetCodeImageUrl, setLeetCodeImageUrl] = useState("");
  const [codeforcesImageUrl, setCodeforcesImageUrl] = useState("");
  const [codechefData, setCodechefData] = useState(null);
  const [gfgData, setGfgData] = useState(null);
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState({
    leetcode: false,
    codeforces: false,
    codechef: false,
    gfg: false,
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

  const fetchGfgStats = async () => {
  if (!username) return showError("Please enter a GFG username");

  setLoading((prev) => ({ ...prev, gfg: true }));

  try {
    const res = await fetch(`https://geeks-for-geeks-api.vercel.app/${username}`);
    const data = await res.json();

    if (data.info && data.info.userName) {
      setGfgData(data);
      updateTimestamp();
      setError("");
    } else {
      showError("GFG username not found.");
    }
  } catch {
    showError("Failed to fetch GFG stats.");
  }

  setLoading((prev) => ({ ...prev, gfg: false }));
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          <button
            onClick={fetchGfgStats}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
          >
            {loading.gfg ? "Loading..." : "GFG"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {timestamp && <p className="text-sm mt-2 text-gray-400">Last updated: {timestamp}</p>}
      </div>

      {(leetCodeImageUrl || codeforcesImageUrl || codechefData || gfgData) && (
        <div className="w-full max-w-5xl mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {codechefData && (
            <div className="rounded-xl p-4 border bg-gradient-to-br from-orange-200 to-red-300 text-black shadow-lg hover:scale-105 transition duration-300">
              <h2 className="text-xl font-bold mb-2">CodeChef Profile</h2>
              <p><strong>Username:</strong> {codechefData.username}</p>
              <p><strong>Rating:</strong> {codechefData.currentRating}</p>
              <p><strong>Stars:</strong> {codechefData.stars}</p>
              <p><strong>Global Rank:</strong> {codechefData.globalRank}</p>
              <p><strong>Country Rank:</strong> {codechefData.countryRank}</p>
              <a
                href={`https://www.codechef.com/users/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105"
              >
                View Profile
              </a>
            </div>
          )}
          {gfgData && (
  <div className="rounded-xl p-4 border bg-gradient-to-br from-green-200 to-green-400 text-black shadow-lg hover:scale-105 transition duration-300">
    <h2 className="text-xl font-bold mb-4">GFG Profile</h2>
    <div className="flex items-center mb-4">
      <img
        src={gfgData.info.profilePicture}
        alt="GFG Profile"
        className="h-16 w-16 rounded-full border-2 border-green-600 mr-4"
      />
      <div>
        <p className="text-lg font-semibold">{gfgData.info.fullName}</p>
        <p className="text-sm text-gray-800">{gfgData.info.institute}</p>
      </div>
    </div>
    <p><strong>Username:</strong> {gfgData.info.userName}</p>
    <p><strong>Institute Rank:</strong> {gfgData.info.instituteRank}</p>
    <p><strong>Current Streak:</strong> {gfgData.info.currentStreak}</p>
    <p><strong>Max Streak:</strong> {gfgData.info.maxStreak}</p>
    <p><strong>Coding Score:</strong> {gfgData.info.codingScore}</p>
    <p><strong>Monthly Score:</strong> {gfgData.info.monthlyScore}</p>
    <p><strong>Total Problems Solved:</strong> {gfgData.info.totalProblemsSolved}</p>
    <a
      href={`https://auth.geeksforgeeks.org/user/${gfgData.info.userName}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105"
    >
      View Profile
    </a>
  </div>
)}
    </div>
  );
};

export default Profile;
