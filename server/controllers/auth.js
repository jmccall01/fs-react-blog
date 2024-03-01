import db from "../db.js"
import bcrypt from "bcrypt"


export const register = (req, res) => {
    //Check emaill
    const q = "SELECT * FROM users WHERE email=$1 OR username=$2"
    db.query(q, [req.body.email, req.body.username], (err, data)=>{
        if(err){
            console.log(err)
            return res.send("Error fetching data")
        }
        if(data.length){
            return res.status(409).json("User already exists")
        }

        //hash password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, values, (err, data)=>{
            if(err){
                console.log(err)
                return res.send("Error fetching data")
            };
            return res.status(200).json("User created")
        })
    })
}

export const login = (req, res) => {

}

export const logout = (req, res) => {
    
}