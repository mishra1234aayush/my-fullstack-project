const {connection} = require("../Connection/connection");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
  const { name, email, password, state } = req.body;
  
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const login_time = new Date().toTimeString().split(" ")[0];

  const sql = "INSERT INTO users (name, email, password, state, login_time) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [name, email, hashedPassword, state, login_time], (err, result) => {
    if (err) {
      console.error("Registration Error:", err);
      return res.status(500).json({ message: "User Already Registered" });
    }
    return res.status(200).json({ message: "✅ User registered successfully" });
  });
};



const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Login Error:", err);
      return res.status(500).json({ message: "Login failed" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    
const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  const login_time = new Date().toTimeString().split(" ")[0];

    return res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        state: user.state,
        login_time: login_time,
        plan: user.plan
      }
    });
  });
};

module.exports = { register, login };
