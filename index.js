const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

app.get("/users", (req, res) => {
  const htmlfunc = `
      <ul>
      <li>Name: Naveen
      </li>
      <li>age: 26
      </li>
      <li>Address: Delhi
      </li>
      </ul>
      `;
  res.send(htmlfunc);
});

app.use((req, res, next) => {
  console.log("Middle ware 1");
  next();
});

app.get("/", (req, res) => {
  return res.send("Hello from server");
});

// Read the data from data.txt
app.get("/getAllData", (req, res) => {
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file");
    }
    // Send the file content as response
    res.send(data);
  });
});

// POST route to handle incoming data and save it to a file
app.post("/getData", (req, res) => {
  const body = req.body;
  // Convert the body object to a string format to save it as text
  const dataToWrite = `id: ${body.id}, Name: ${body.name}, Age: ${body.age}, Address: ${body.address}\n`;

  // Write data to a text file (or append if the file already exists)
  fs.appendFile("data.txt", dataToWrite, (err) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    res.send("Data received and stored in file");
  });
});

// Update the existing data
app.patch("/getData", (req, res) => {
  const updatedData = req.body;

  // Read the file content
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    // Split the file content by newline to get individual records
    const lines = data.trim().split("\n");

    // Flag to track if the record is found and updated
    let recordFound = false;

    // Iterate through each line and update the matching record based on the id
    const updatedLines = lines.map((line) => {
      const [idPart, namePart, agePart, addressPart] = line.split(", ");

      // Extract id from the line, e.g., "id: 1"
      const id = parseInt(idPart.split(": ")[1]);

      // Compare the id
      if (id === updatedData.id) {
        recordFound = true;
        return `id: ${updatedData.id}, Name: ${updatedData.name}, Age: ${updatedData.age}, Address: ${updatedData.address}`;
      }
      return line;
    });

    // If the record was not found, return a 404 response
    if (!recordFound) {
      return res.status(404).send("Record not found");
    }

    // Write the updated data back to the file
    fs.writeFile("data.txt", updatedLines.join("\n") + "\n", (err) => {
      if (err) {
        return res.status(500).send("Error writing file");
      }
      res.send("Record updated successfully");
    });
  });
});

//Search the data with id
app.get("/getData/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Get the ID from the route parameter

  // Read the file content
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    // Split the file content by newline to get individual records
    const lines = data.trim().split("\n");

    // Find the line with the matching ID
    const foundRecord = lines.find((line) => {
      const [idPart] = line.split(", ");
      const id = parseInt(idPart.split(": ")[1]); // Extract ID from the line
      return id === userId;
    });

    // If no record is found, return a 404
    if (!foundRecord) {
      return res.status(404).send("Record not found");
    }

    // If a record is found, return it
    res.send(foundRecord);
  });
});

// Route to delete a specific user by ID
app.delete("/getData/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Get the ID from the route parameter

  // Read the file content
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }

    // Split the file content by newline to get individual records
    const lines = data.trim().split("\n");

    // Filter out the line with the matching ID
    const updatedLines = lines.filter((line) => {
      const [idPart] = line.split(", ");
      const id = parseInt(idPart.split(": ")[1]); // Extract ID from the line
      return id !== userId; // Keep lines that do not match the ID
    });

    // If no record was deleted, return a 404
    if (lines.length === updatedLines.length) {
      return res.status(404).send("Record not found");
    }

    // Write the updated data back to the file
    fs.writeFile("data.txt", updatedLines.join("\n") + "\n", (err) => {
      if (err) {
        return res.status(500).send("Error writing file");
      }
      res.send("Record deleted successfully");
    });
  });
});

app.listen(8000, () => console.log("Server started at 8000"));
