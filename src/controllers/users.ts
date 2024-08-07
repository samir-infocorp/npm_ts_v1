import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import { Request, Response } from 'express';
import { QueryResult } from 'pg';

const registerUser = async (req: Request, res: Response) => {
    const username:String = req.body.username;  
    const password:String = req.body.password;  
    const email:String = req.body.email;    
    try {
        await pool.connect();
        console.log("established connection with server");
        const userExists:QueryResult = await pool.query(`SELECT * FROM users WHERE email = $1`,[ email ]);

        if(userExists.rows.length > 0) {
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

        const hashedPassword:String = await bcrypt.hash(String(password),10);

        const newUser:QueryResult = await pool.query(
            `INSERT INTO users (username, email, password)
            VALUES($1, $2, $3) RETURNING *`,
            [username, email, hashedPassword]
        );

        if(!newUser) {
            return res.status(400).json({
                message: 'failed to create user'
            });
        }

        return res.status(201).json({
            message: 'user created',
            data: newUser.rows,
        });
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({
            error: error,
        });
    }
};

export {
    registerUser,
}