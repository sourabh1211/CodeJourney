import React, { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [leetCodeImageUrl, setLeetCodeImageUrl] = useState("");
  const [codeforcesImageUrl, setCodeforcesImageUrl] = useState("");
  const [codechefData, setCodechefData] = useState(null);
  const [error, setError] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const updateTimestamp = () => {
    const now = new Date();
    setTimestamp(now.toLocaleString());
  };

  const fetchLeetCodeStats = () => {
    if (!username) {
      setError("Please enter a LeetCode username");
      return;
    }
    setLeetCodeImageUrl(
      `https://leetcard.jacoblin.cool/${username}?theme=dark&font=Ubuntu&cache=14400&ext=contest`
    );
    setError("");
    updateTimestamp();
  };

  const fetchCodeforcesStats = () => {
    if (!username) {
      setError("Please enter a Codeforces username");
      return;
    }
    setCodeforcesImageUrl(
      `https://codeforces-readme-stats.vercel.app/api/card?username=${username}`
    );
    setError("");
    updateTimestamp();
  };

  const fetchCodeChefStats = async () => {
    if (!username) {
      setError("Please enter a CodeChef username");
      return;
    }
    try {
      const response = await fetch(`https://codechef-api.vercel.app/handle/${username}`);
      const data = await response.json();
      if (data.currentRating) {
        setCodechefData(data);
        setError("");
        updateTimestamp();
      } else {
        setError("CodeChef username not found.");
      }
    } catch (error) {
      setError("Failed to fetch CodeChef stats.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg">CodeJourney</h1>
        <p className="text-lg text-gray-300 mt-2">Track your coding stats effortlessly</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg text-center">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={fetchLeetCodeStats} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition">LeetCode</button>
          <button onClick={fetchCodeforcesStats} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition">Codeforces</button>
          <button onClick={fetchCodeChefStats} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg transition">CodeChef</button>
        </div>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {leetCodeImageUrl && (
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg text-center border-2 border-white hover:bg-cyan-900 transition duration-300">
            <h3 className="text-xl font-semibold text-cyan-400">LeetCode Stats</h3>
            <img src={leetCodeImageUrl} alt="LeetCode Stats" className="w-full max-w-sm mx-auto mt-4 rounded-lg" />
            <p className="text-sm text-gray-400 mt-2">Last updated: {timestamp}</p>
          </div>
        )}
        {codeforcesImageUrl && (
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg text-center border-2 border-white hover:bg-green-800 transition duration-300">
            <h3 className="text-xl font-semibold text-green-400">Codeforces Stats</h3>
            <img src={codeforcesImageUrl} alt="Codeforces Stats" className="w-full max-w-sm mx-auto mt-4 rounded-lg" />
            <p className="text-sm text-gray-400 mt-2">Last updated: {timestamp}</p>
          </div>
        )}
        {codechefData && (
          <div className="bg-gray-800 p-5 rounded-xl shadow-lg text-center border-2 border-white hover:bg-orange-300 transition duration-300">
          <div className="bg-black p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-white">CodeChef Stats</h3>
            <img src={codechefData.profile} alt="CodeChef Profile" className="w-24 h-24 mx-auto rounded-full border-2 border-white mt-3" />
            <p className="text-lg mt-2 font-bold">{codechefData.name}</p>
            <p className="text-lg">⭐ Rating: {codechefData.currentRating}</p>
            <p className="text-lg">📈 Highest Rating: {codechefData.highestRating}</p>
            <p className="text-lg">🔥 Stars: {codechefData.stars}</p>
            <p className="text-lg">🏆 Global Rank: {codechefData.globalRank}</p>
            <p className="text-lg">🌍 Country Rank: {codechefData.countryRank}</p>
            <img src={codechefData.countryFlag} alt={codechefData.countryName} className="w-10 h-6 mt-2 mx-auto" />
            <p className="text-sm text-gray-400 mt-2">Last updated: {timestamp}</p>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
};

export default Profile;
