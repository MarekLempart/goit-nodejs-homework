// homework-05/services/directorySetup.js

const fs = require("fs").promises;
const path = require("path");

const createDirectory = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Directory ${dirPath} created or already exists.`);
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
  }
};

const setupDirectories = async () => {
  const directories = [
    path.join(__dirname, "../public"),
    path.join(__dirname, "../public/avatars"),
    path.join(__dirname, "../tmp"),
  ];

  for (const dir of directories) {
    await createDirectory(dir);
  }
};

module.exports = setupDirectories;
