const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post(
    "/register",

    async (
        req,
        res
    ) => {

        try {

            const {

                name,
                email,
                password

            }

                =

                req.body;

            if (

                !name
                ||

                !email
                ||

                !password

            ) {

                return res
                    .status(400)
                    .json({

                        message:

                            "All fields required"

                    });

            }

            const exists =

                await User.findOne({

                    email

                });

            if (
                exists
            ) {

                return res
                    .status(400)
                    .json({

                        message:

                            "User already exists"

                    });

            }

            const hashed =

                await bcrypt.hash(
                    password,
                    10
                );

            const user =

                await User.create({

                    name,

                    email,

                    password:

                        hashed

                });

            res.json({

                message:

                    "Registered",

                user

            });

        }

        catch (error) {

            console.log(
                error
            );

            res
                .status(500)
                .json({

                    message:

                        error.message

                });

        }

    }

);

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Wrong Password" });
        }
        const token = jwt.sign({ id: user._id }, "secret123");
        res.json({
            token, user: {
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

module.exports = router;