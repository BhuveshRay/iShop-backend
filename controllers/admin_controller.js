const { createToken } = require('../helper');
const Admin = require('../models/admin_model');

class AdminController {
    // User registration method
    signup(data) {
        return new Promise(
            async (res, rej) => {
                try {
                    const userMatch = await Admin.findOne({ email: data.email });
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
                    const admin = await Admin.findOne({ email: data.email });
                    if (admin) {
                        if (admin.password == data.password) {
                            const token = createToken(admin);
                            res({
                                msg: "Login Successfully",
                                status: 1,
                               admin: { ...admin.toJSON(), password: null },
                               token
                            })
                        } else {
                            rej({
                                msg: "Wrong password",
                                status: 0
                            })
                        }
                    } else {
                        rej({
                            msg: "Admin doesn't exist",
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
}

module.exports = AdminController;
