import pool from './db.js';
import * as querries from './queries.js';
import bcrypt from 'bcrypt';
import {jwtTokens} from './jwt/jwt-helpers.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// get all contacts
export const getContacts = (req, res) => {
    pool.query(querries.getContacts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        return;
    });
};

// get sigle contact information by id
export const getContactsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(querries.getContactsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        return;
    });
};

// add contact (not same name and number)
export const addContact = (req, res) => {
    const { name, email, address, image, phone, fav } = req.body;
    pool.query(querries.checkNameExists, [name], (error, results) => {
        if (results.rows.length) {
            res.send("Name Already Exists"); 
            return;             
        }

        pool.query(querries.checkNumberExists, [phone], (error, results) => {
            if (results.rows.length) {
                res.send("Number Already Exists");
                return;
            }

            pool.query(querries.addContact, [name, email, address, image, phone, fav],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Contact Created Successfully");
                    return;
                }
                
            );
        });               

    });

};

// delete single contact
export const deleteContact = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(querries.getContactsById, [id], (error, results) => {
        console.log(id);
        const noContactFound = !results.rows.length;
        if (noContactFound) {                     
            res.send("Error Contact Does not Exist while Deleting");
            return;
        }
        pool.query(querries.deleteContact, [id],
            (error, results) => {
                if (error) throw error;
                res.status(200).send("Contact Deleted Successfully");                
                return;
            }
            
        );                       

    });

};

// update contact
export const updateContact = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, address, image, phone, fav } = req.body;
    console.log("enter", name);   
        
    pool.query(querries.updateContact, [name, email, address, image, phone, fav, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("Contact Updated Successfully");                
            return;
        }
    );

};


// add user
export const addUser = async (req, res) => {
    const { user_name, user_email, user_password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.user_password,10);
    pool.query(querries.checkEmailExists, [user_email], (error, results) => {
        if (results.rows.length) {
            res.send("Email Should Be Unique"); 
            return;             
        } 
        
        pool.query(querries.checkUserNameExists, [user_name], (error, results) => {
            if (results.rows.length) {
                res.send("UserName already Taken, Choose unique name");
                return;
            }

            pool.query(querries.addUser, [user_name, user_email, hashedPassword],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Contact Created Successfully");
                    return;
                }
                
            ); 
        });                

    });

};

// get sigle user information by name
export const getUserByName = (req, res) => {
    const name = req.params.name;
    pool.query(querries.getUserByName, [name], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        return;
    });
};

// delete single user
export const deleteUser = (req, res) => {
    const name = req.params.name;
    pool.query(querries.getUserByName, [name], (error, results) => {
        const noUserFound = !results.rows.length;
        if (noUserFound) {                     
            res.send("Error User Does not Exist while Deleting");
            return;
        }
        
        pool.query(querries.deleteUser, [name],
            (error, results) => {
                if (error) throw error;
                res.status(200).send("User Deleted Successfully");                
                return;
            }
            
        );                       

    });

};

export const getUsers = (req, res) => {
    pool.query(querries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        return;
    });
};

// user login 
export const userLogin = async (req, res) => {
    const { user_email, user_password } = req.body;
    const users = await pool.query('select * from users where user_email = $1', [user_email]);
    if (users.rows.length === 0) return res.status(401).json({error: "Email is incorrect"});
    const validPassword = await bcrypt.compare(user_password, users.rows[0].user_password);
    if(!validPassword) return res.status(401).json({error: "Incorrect password"});
    
    
    // return res.status(200).json("success");
    let tokens = jwtTokens(users.rows[0]);
    tokens.name=users.rows[0].user_name
    // console.log("users",users.rows[0].user_name)

    res.cookie('refreshToken', tokens.refreshToken, {httpOnly:true});
    res.json(tokens);

};

export const refreshToken = (req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken === null) return res.status(401).json({error: "Null refresh token"});
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (error,user) => {
            if(error) return res.status(403).json({error: error.message});
            let tokens = jwtTokens(user);
            res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true});
            res.json(tokens);
        })
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

export const deleteToken = (req,res) => {
    try {
        res.clearCookie('refreshToken');
        return res.status(200).json({message: 'refresh token deleted'})
    } catch (error) {
        res.status(401).json({ error : error.message});
    }
}
