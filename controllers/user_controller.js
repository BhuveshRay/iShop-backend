const Cart = require('../models/cart_model');
const User = require('../models/user_model');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('bhuveshRay@jaipur');

class UserController {
    // User registration method
    signup(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const userMatch = await User.findOne({ email: data.email });
                    if (userMatch) {
                        rej({
                            msg: "Email already exists",
                            status: 0
                        })
                    } else {
                        if (data?.name != "" && data.email != "" && data.password != "" && data.confirm_password != "") {
                            if (data.password === data.confirm_password) {
                                const encryptedPassword = cryptr.encrypt(data.password);
                                const user = new User({
                                    name: data.name,
                                    email: data.email,
                                    password: encryptedPassword
                                })
                                user.save()
                                    .then(
                                        () => {
                                            res({
                                                user: { ...user, password: null },
                                                msg: "Account created",
                                                status: 1
                                            })
                                        }
                                    ).catch(
                                        () => {
                                            rej({
                                                user,
                                                msg: "Unable to created the account",
                                                status: 0
                                            })
                                        }
                                    )
                            } else {
                                rej({
                                    msg: "Password and confirm password must match",
                                    status: 0
                                })
                            }
                        } else {
                            rej({
                                msg: "Please ente all required data",
                                status: 0
                            })
                        }
                    }
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    // User login method
    login(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findOne({ email: data.email });
                    if (user) {
                        const decryptedPassword = cryptr.decrypt(user.password);
                        if (decryptedPassword == data.password) {
                            res({
                                msg: "Login Successfully",
                                status: 1,
                                user: { ...user.toJSON(), password: null }
                            })
                        } else {
                            rej({
                                msg: "Wrong password",
                                status: 0
                            })
                        }
                    } else {
                        rej({
                            msg: "User doesn't exist",
                            status: 0,
                        })
                    }
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    userData(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const users = await User.find();
                    const decryptedUsers = users.map(user => {
                        return {
                            ...user._doc, // Spread the rest of the user properties
                            password: cryptr.decrypt(user.password) // Decrypt the password
                        };
                    });
                    res({
                        msg: "Data found",
                        status: 1,
                        decryptedUsers,
                        total: decryptedUsers.length
                        //    users,
                    })
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    moveToDBCart({ cartData, user_id }) {
        return new Promise(
            async (res, rej) => {
                try {
                    const data = JSON.parse(cartData);

                    const allPromises = data.map(
                        async (d) => {
                            const cartExists = await Cart.findOne({ user_id: user_id, product_id: d.pId });
                            if (cartExists) {
                                await Cart.updateOne({ _id: cartExists._id }, { qty: cartExists.qty + d.qty })
                            } else {
                                const cart = new Cart({ product_id: d.pId, qty: d.qty, user_id });
                                await cart.save();
                            }
                        }
                    )

                    await Promise.all(allPromises);

                    const userCart = await Cart.find({ user_id: user_id });

                    res({
                        msg: "Moved to cart",
                        status: 1,
                        userCart
                    })
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }

    addAddress(user_id, data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const user = await User.findById(user_id);
                    if (user) {
                        const newAddres = [
                            ...user.address,
                            {
                                name: data.name,
                                email: data.email,
                                contact: data.contact,
                                pincode: data.pincode,
                                address: data.address,
                                state: data.state,
                                city: data.city
                            }
                        ]
                        User.updateOne({ _id: user_id }, {
                            address: newAddres
                        }).then(
                            (success) => {
                                res({
                                    msg: 'Address added',
                                    status: 1
                                })
                            }
                        ).catch(
                            (err) => {
                                rej({
                                    msg: 'Unable to add address',
                                    status: 0
                                })
                            }
                        )
                    } else {

                    }
                } catch (err) {
                    rej({
                        msg: 'Internal server error',
                        status: 0
                    })
                }
            }
        )
    }

    getUserAddress(user_id) {
        return new Promise(
            async (res, rej) => {
                try {
                    const userAddress = await User.find({ _id: user_id }, { address: 1 });
                    res({
                        msg: "Data found",
                        status: 1,
                        userAddress: userAddress[0].address,
                    })
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
    editUser(user_id,data) {
        return new Promise(
            async (res, rej) => {
                console.log(data);
                try {
                    const user = User.updateOne({ _id: user_id }, {
                     name: data.name,
                        lastName: data.lastName,
                        email: data.email,
                        contact: data.contact,
                        gender: data.gender,
                        bio: data.bio,
                        address: JSON.parse(data.address)
                    })
                    user.save
                        .then(
                            () => {
                                res({
                                    msg: "user data updated",
                                    status: 1
                                })
                            }
                        ).catch(
                            (err) => {
                                rej({
                                    msg: "Unable to update",
                                    status: 0
                                })
                            }
                        )

                } catch (err) {
                    console.log(err.message)
                    rej({
                        msg: 'Internal Server error',
                        status: 0
                    })
                }
            }
        )
    }
    changeStatus(id, new_status) {
        return new Promise(
            (res, rej) => {
                try {
                    User.updateOne(
                        {
                            _id: id
                        },
                        {
                            status: new_status
                        }
                    ).then(
                        () => {
                            res({
                                msg: "Status changed",
                                status: 1
                            })
                        }
                    ).catch(
                        () => {
                            rej({
                                msg: "Unable to change the status",
                                status: 0
                            })
                        }
                    )
                } catch (err) {
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )

    }
    delete(id) {
        return new Promise(
            async (res, rej) => {
                try {
                    await User.deleteOne(
                        {
                            _id: id
                        }
                    ).then(
                        () => {
                            res({
                                msg: "User Deleted",
                                status: 1,
                            })
                        }
                    ).catch(
                        (err) => {
                            rej({
                                msg: "Unable to delete the user",
                                status: 0
                            })
                        }
                    )
                } catch (err) {
                    console.log(err.message);
                    rej({
                        msg: "Internal server error",
                        status: 0
                    })
                }
            }
        )
    }
}

module.exports = UserController;
