import pool from "../db/db.js";

// Obtener todos los usuarios
export const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: [] });
            return;
        }
        res.status(200).json({ msg: "Ok", users: results });
    });
};

// Obtener un usuario por ID
export const getUser = (req, res) => {
    const id = req.params.id;
    pool.execute("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: [] });
            return;
        }
        res.status(200).json({ msg: "Ok", users: results });
    });
};

// Crear un nuevo usuario
export const postUser = (req, res) => {
    const { name, username, password, age } = req.body;
    pool.execute(
        "INSERT INTO users (name, username, password, age) VALUES (?, ?, ?, ?)",
        [name, username, password, age],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error, users: [] });
                return;
            }
            res.status(200).json({ msg: "Usuario agregado", results });
        }
    );
};

// Actualizar usuario
export const putUser = (req, res) => {
    const { name, username, password, age } = req.body;
    const id = req.params.id;
    pool.execute(
        "UPDATE users SET name = ?, username = ?, password = ?, age = ? WHERE id = ?",
        [name, username, password, age, id],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error });
                return;
            }
            res.status(200).json({ msg: "Usuario actualizado", results });
        }
    );
};

// Eliminar usuario
export const deleteUser = (req, res) => {
    const id = req.params.id;
    pool.execute("DELETE FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        res.status(200).json({ msg: "Usuario eliminado", results });
    });
};

// Login
export const login = (req, res) => {
    const { username, password } = req.body;
    pool.execute("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        if (results.length < 1) {
            res.status(401).json({ isLogin: false, msg: "Credenciales inválidas", user: null });
            return;
        }
        if (results[0].password === password) {
            res.status(200).json({ msg: "Login exitoso", isLogin: true, user: results[0] });
        } else {
            res.status(401).json({ isLogin: false, msg: "Credenciales inválidas", user: null });
        }
    });
};
