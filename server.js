import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API route to add members
app.post("/api/add-members", async (req, res) => {
  try {
    const { members } = req.body;
    if (!members || !Array.isArray(members)) {
      return res.status(400).json({ error: "Invalid members data" });
    }

    // Prepare request payload
    const payload = {
      groupId: "group_awthbfl6AX", // Example groupId
      members: members, // List of members
    };

    const response = await fetch("https://public.doubletick.io/groups/add-members", {
      method: "POST",
      headers: {
        "Authorization": "key_i3WFtZvlVd",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const responseData = await response.json();
    res.json({ success: true, message: "Members added successfully", data: responseData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
