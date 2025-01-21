const fs = require('fs');
const path = require('path');

let gameList = null;

// fetchs game list from game-data.json
function fetchGameList() {
  // if gameList is not null returns gameList
  if (gameList) {
    return gameList;
  }

  // if not null, parses json and returns the game list
  const gameJsonPath = path.join(__dirname, '../assets/game-data.json');
  const gameJson = fs.readFileSync(gameJsonPath, 'utf-8');
  gameList = JSON.parse(gameJson);

  return gameList;
}

// returns the game list by pagination. by default, returns 1-10 items of list, max 10 items limit per page
exports.getGameList = async (page = 1, gameList) => {
    try {
      //const gameList = fetchGameList();

      const itemCount = 10;
      const start = (page - 1) * itemCount;
      const end = page * itemCount;
      
      if(!gameList) {
        const list = fetchGameList();
        return list.slice(start, end);
      } else {
        return gameList.slice(start, end);
      }
    } catch (error) {
      console.error('Error fetching game list:', error);
      return [];
    }
};

const cache = new Map(); // In-memory cache
// returns filtered game list by search text
exports.searchGame = async (searchText = "") => {
  try {
    // Question 5 to use cache for improvising search on backend side
    const lowerSearchText = searchText.toLowerCase().trim();
    if (cache.has(lowerSearchText)) {
      return cache.get(lowerSearchText);
    }
  
    const gameList = fetchGameList();

    const filteredGameList = gameList.filter((item) => 
      item.title.toLowerCase().includes(lowerSearchText) ||
      item.providerName.toLowerCase().includes(lowerSearchText)
    );

    cache.set(lowerSearchText, filteredGameList);
  
    return filteredGameList;
  } catch (error) {
    console.error('Error searching game list:', error);
    return [];
  }
};

// returns how many pages needed to display all game items
exports.getPageCount = async (searchText = "") => {
  try {
    // 1. Read and parse the JSON file
    const gameList = fetchGameList();

    const itemCount = searchText === "" ? gameList.length : (await exports.searchGame(searchText)).length;

    return itemCount;
  } catch (error) {
    console.error('Error fetching page count', error);
    return [];
  }
};