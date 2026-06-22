const express = require("express");

const router = express.Router();

const Result = require("../models/Result");

router.post("/", async (req, res) => {
    try {
        const result = await Result.create(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    const results = await Result.find().sort({ score: -1 }).limit(10);
    res.json(results);
}
);

router.get("/leaderboard",

    async (req, res) => {

        try {

            const results =

                await Result.find();

            const users = {};

            results.forEach((item) => {

                if (

                    !users[item.user]

                    ||

                    item.score >

                    users[item.user].score

                ) {

                    users[item.user] = item;

                }

            });

            const leaderboard =

                Object.values(users)

                    .sort(

                        (a, b) =>

                            b.score - a.score

                    );

            res.json(
                leaderboard
            );

        }

        catch (error) {

            res.status(500).json({

                message:

                    error.message

            });

        }

    });
module.exports = router;