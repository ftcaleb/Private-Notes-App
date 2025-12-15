const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();
app.use(express.json());
app.use(cors());

/**
 * REGISTER
 */
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }, // stored as user_metadata
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // ✅ CORRECT ACCESS
    return res.status(201).json({
      message: "User registered successfully",
      user: data.user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * LOGIN
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ CORRECT ACCESS
    return res.status(200).json({
      message: "Successfully Logged In",
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3002, () => {
  console.log("Server running on port 3002");
});
