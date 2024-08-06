var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        yield pool.connect();
        const userExists = yield pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({
                message: "user already exists"
            });
        }
        /*const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log(typeof(result));
        if (result.rows.length > 0) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }*/
        const hashedPassword = yield bcrypt.hash(String(password), 10);
        const newUser = yield pool.query(`INSERT INTO users (username, email, password)
            VALUES($1, $2, $3) RETURNING *`, [username, email, hashedPassword]);
        if (!newUser) {
            return res.status(400).json({
                message: 'failed to create user'
            });
        }
        return res.status(201).json({
            message: 'user created',
            data: newUser.rows,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error,
        });
    }
});
export { registerUser, };
