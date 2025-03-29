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
    setTimeout(() => setLoading((prev) => ({ ...prev, leetcode: false })), 1000);
  };

  const fetchCodeforcesStats = () => {
    if (!username) return showError("Please enter a Codeforces username");
    setLoading((prev) => ({ ...prev, codeforces: true }));
    setCodeforcesImageUrl(
      `https://codeforces-readme-stats.vercel.app/api/card?username=${username}`
    );
    updateTimestamp();
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
      className={`min-h-screen w-full flex flex-col md:flex-row transition-colors duration-500 overflow-hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* LEFT SIDE */}
      <div
        className={`w-full md:w-[30%] p-6 flex flex-col items-center gap-6 shadow-xl transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white/90"
        }`}
      >
        <h1
          className={`text-4xl font-extrabold text-center transition-all duration-500 ${
            darkMode
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              : "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500"
          }`}
        >
          CodeJourney 🚀
        </h1>

        <button
          onClick={toggleTheme}
          className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
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
          className="w-full p-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={fetchLeetCodeStats}
            className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-full shadow"
          >
            {loading.leetcode ? "Loading..." : "LeetCode"}
          </button>
          <button
            onClick={fetchCodeforcesStats}
            className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-full shadow"
          >
            {loading.codeforces ? "Loading..." : "Codeforces"}
          </button>
          <button
            onClick={fetchCodeChefStats}
            className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded-full shadow"
          >
            {loading.codechef ? "Loading..." : "CodeChef"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {timestamp && <p className="text-sm text-gray-400">Last updated: {timestamp}</p>}
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`w-full md:w-[70%] p-6 grid gap-6 grid-cols-1 md:grid-cols-3 transition-all duration-500 ${
          darkMode ? "bg-black" : "bg-white"
        }`}
        style={{ minHeight: "100vh" }}
      >
        {leetCodeImageUrl && (
          <div className="md:col-span-2 rounded-xl overflow-hidden border bg-black p-2 shadow-xl transition-transform duration-300 hover:scale-105 w-full h-full">
            <img
              src={leetCodeImageUrl}
              alt="LeetCode Stats"
              className="h-full w-full object-contain"
            />
            <div className="mt-2 text-right">
              <a
                href={`https://leetcode.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {codeforcesImageUrl && (
          <div className="rounded-xl overflow-hidden border bg-black p-2 shadow-xl transition-transform duration-300 hover:scale-105 w-full h-full">
            <img
              src={codeforcesImageUrl}
              alt="Codeforces Stats"
              className="h-full w-full object-contain"
            />
            <div className="mt-2 text-right">
              <a
                href={`https://codeforces.com/profile/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                View Profile
              </a>
            </div>
          </div>
        )}

        {codechefData && (
          <div className="rounded-xl overflow-hidden border bg-black p-4 text-white shadow-xl transition-transform duration-300 hover:scale-105 w-full h-full flex flex-col justify-between">
            <div>
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
              <div className="grid grid-cols-2 gap-3 text-sm mt-4">
                <p><strong>Rating:</strong> {codechefData.currentRating}</p>
                <p><strong>Stars:</strong> {codechefData.stars}</p>
                <p><strong>Highest:</strong> {codechefData.highestRating}</p>
                <p><strong>Rank:</strong> {codechefData.countryRank}</p>
              </div>
            </div>
            <a
              href={`https://www.codechef.com/users/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="self-end mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
