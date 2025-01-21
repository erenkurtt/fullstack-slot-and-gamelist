const {getGameList, getPageCount, searchGame} = require('../services/game.service');

exports.getGames = async (req, res, next) => {
    try {
      // Read page from query string, default to 1 if not present
      const page = parseInt(req.query.page, 10) || 1;
      // Read search text from query string
      const searchText = req.query.searchText || "";
      // calculates how many pages needed to display
      const totalPageCount = await getPageCount(searchText);

      let data;
      if (searchText) {
        // if search text is not null, gets filtered list and returns game list by search results
        const filteredData = await searchGame(searchText);
        data = await getGameList(page, filteredData);
      } else {
        data = await getGameList(page);
      }
      // the data type has page numberl, total pagei and game list to use for frontend
      return res.status(200).json({
        success: true,
        page,
        totalPage: Math.ceil(totalPageCount / 10),
        data
      });
    } catch (error) {
      next(error);
    }
};