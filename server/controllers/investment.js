import ASX_Transactions from "../models/ASX_Transactions.js";
import User from "../models/User.js";

export const getASXTransactions = async (req, res) => {
  try {
    // Frontend sending {"field": "id", "sort": "desc"} as a string
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like [["userId", "desc"]]
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = [
        [sortParsed.field, sortParsed.sort === "asc" ? "ASC" : "DESC"],
      ];

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : [];

    const transactions = await ASX_Transactions.findAll({
      where: {
        [Op.or]: [
          { id: { [Op.iLike]: `%${search}%` } },
          { symbol: { [Op.iLike]: `%${search}%` } },
        ],
      },
      order: sortFormatted,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    // const total = await ASX_Transactions.count({
    //   where: {
    //     [Op.or]: [
    //       { cost: { [Op.iLike]: `%${search}%` } },
    //       { userId: { [Op.iLike]: `%${search}%` } },
    //     ],
    //   },
    // });

    res.status(200).json({
      transactions,
      //total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
