import { pool } from "../DB/db.js"
import { getSalt, hashing } from "../utils/hash.js";

//DONE
export const getUsers = (req, res) => {
    pool.query('SELECT * from users', function (error, results) {
    if (error){
        res.status(500).json({msg : error.message, users : [],});
        return;
    };
    res.status(200).json({msg: "OK", users : results});
  })
};

//DONE
export const getUser = (req, res) => {
    const id = req.params.id;
    pool.execute('SELECT * from users where id_users = ?', [id], (error, results) => {
        if (error){
            res.status(500).json({msg : error.message, users : [],});
            return;
        };
        res.status(200).json({msg: "OK", users : results});
      }) 
};

//DONE
export const postUsers = (req, res) => {
    const { name, username, pass, age } = req.body; //debes llamar EXACTAMENTE el nombre de la propiedad para que dentro del body las encuentre
    //security before adding a new user
    const salt = getSalt();
    const hash = hashing(pass, salt);
    const hashedPassword = salt + hash;

    pool.execute("insert into users(name, username, pass, age) values (?, ?, ?, ?)", 
        [name, username, hashedPassword, age], //save the hashed pass instead of the conventional password,
        (error, results) => {
        if (error){
            res.status(500).json({msg : error.message, users : [],});
            return;
        }
        console.log(results)
        res.status(200).json({msg: "OK", users : results });
      });
};

//DONE
export const putUsers = (req, res) => {
    const { name, username, pass, age } = req.body; //debes llamar EXACTAMENTE el nombre de la propiedad para que dentro del body las encuentre
    pool.execute("update users set name=?, username=?, pass=?, age=? where id_users = ? ", 
        [name, username, pass, age, req.params.id],
        (error, results) => {
        if (error){
            res.status(500).json({msg : error.message, users : [],});
            return;
        }
        res.status(200).json({msg: "OK", users : results });
      }
    );
};

//DONE
export const deleteUser = (req, res) => {
    pool.execute(
        "delete from users where id_users = ?",
        [req.params.id],
        (error, results) => {
            if (error){
                res.status(500).json({msg: error, users: []});
                return;
            }
            res.status(200).json({msg: "ok", users: results});
        }
    )
};

//DONE
export const login = (req, res) => {
    const { username, pass } = req.body; //debes llamar EXACTAMENTE el nombre de la propiedad para que dentro del body las encuentre
    console.log(req.body);
    
    pool.execute(
        "SELECT * FROM users WHERE username = ?"
        ,[ username ], (error, results) => {
        if (error){
            res.status(500).json({msg : error.message, users : {} });
            return;
        }
        if (results.length < 1){
            res.status(401).json({isLogin: false, msg: "credenciales no encontradas", user : {} });
            return;
        }
        //en la base de datos la contraseña tambien se llama
        const salt = results[0].pass.substring(0, process.env.SALT_SIZE); //get the respective pass salt
        const hash = hashing(pass, salt);

        if (results[0].pass === salt + hash){ //[0] because results it's an array with the user's dictionary within it
            res.status(200).json({isLogin: true, msg: "OK", user : results[0] });
        } else {
            res.status(401).json({isLogin: false, msg: "credenciales invalidas", user : {} });
            return;
        }
        }
    );
};