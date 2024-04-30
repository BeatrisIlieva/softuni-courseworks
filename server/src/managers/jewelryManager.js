const Jewelry = require("../models/Jewelry");

exports.getAll = async (categoryId) => {

  let query = [
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $match: {
        category: categoryId,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: {
          $first: {
            $arrayElemAt: ["$inventories.price", 0],
          },
        },
        firstImageUrl: {
          $addToSet: "$firstImageUrl",
        },
        jewelryIds: {
          $push: "$_id",
        },
        categoryTitle: {
          $addToSet: "$categories.title",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
        inventories: {
          $push: "$inventories",
        },
      },
    },
    {
      $addFields: {
        isSoldOut: {
          $reduce: {
            input: "$inventories",
            initialValue: true,
            in: {
              $and: [
                "$$value",
                {
                  $eq: [
                    {
                      $size: {
                        $filter: {
                          input: "$$this",
                          as: "inv",
                          cond: {
                            $gt: [
                              "$$inv.quantity",
                              0,
                            ],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        jewelryTitle: 1,
        isSoldOut: 1,
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const jewelries = await Jewelry.aggregate(query);
  console.log(jewelries);

  return jewelries;
};
