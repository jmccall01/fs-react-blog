import {db} from '../db.js'
import jwt from "jsonwebtoken"

export const getPosts = (req, res)=>{
    let q;
    
    if(req.query.cat){
        q = 'SELECT * FROM posts WHERE cat=$1 ORDER BY date DESC';
        db.query(q, [req.query.cat], (err, data)=>{
            if (err){
                return res.status(500).send(err);
            }
            return res.status(200).json(data.rows);
        })
    }else{
        q = 'SELECT * FROM posts ORDER BY date DESC';
        db.query(q, (err, data)=>{
        if (err){
            return res.status(500).send(err);
        }
        return res.status(200).json(data.rows);
    })
    }
}
export const getSinglePost = (req, res)=>{
    const id = req.params.id;
    const q = 'SELECT p.id, username, title, description, img, uimg, cat, date, userid FROM posts p FULL JOIN users u ON u.id=p.userid WHERE p.id=$1';
    db.query(q, [id], (err, data)=>{
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }else {
            return res.status(200).json(data.rows[0])
        }
    })
    
}
export const addPost = (req, res)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("Not authenticated");
    }else {
        jwt.verify(token, process.env.JWT_KEY, (err, userInfo)=>{
            if(err){
                return res.status(403).json("Token not valid");
            }else{
                const q = 'INSERT INTO posts(title, description, img, cat, date, userid) VALUES($1, $2, $3, $4, $5, $6)';
                const values = [
                    req.body.title,
                    req.body.desc,
                    req.body.img,
                    req.body.cat,
                    req.body.date,
                    userInfo.id
                ];
                db.query(q, values, (err, data)=>{
                    if(err){
                        return res.status(500).json(err);
                    }else{
                        return res.json("Post has been created.")
                    }
                })
            }
        })
    }
}

export const deletePost = (req, res)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("Not authenticated");
    }else {
        jwt.verify(token, process.env.JWT_KEY, (err, userInfo)=>{
            if(err){
                return res.status(403).json("Token not valid");
            }else{
                const postId = req.params.id;
                const q = "DELETE FROM posts WHERE id=$1 AND userid=$2";
                db.query(q, [postId, userInfo.id], (err, data)=>{
                    err ? res.status(500).send("Problem deleting data") : res.status(200).send("Post deleted");
                })
            }
        })
        
    }
}
export const updatePost = (req, res)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("Not authenticated");
    }else {
        jwt.verify(token, process.env.JWT_KEY, (err, userInfo)=>{
            if(err){
                return res.status(403).json("Token not valid");
            }else{
                const q = 'UPDATE posts SET title=$1, description=$2, img=$3, cat=$4 WHERE id=$5 AND userid=$6';
                const values = [
                    req.body.title,
                    req.body.desc,
                    req.body.img,
                    req.body.cat,
                    req.params.id,
                    userInfo.id
                ];
                db.query(q, values, (err, data)=>{
                    if(err){
                        console.log(err)
                        return res.status(500).json(err);
                    }else{
                        return res.json("Post has been updated.")
                    }
                })
            }
        })
    }
}