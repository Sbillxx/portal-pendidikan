const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "build", "asset-manifest.json");

// Baca file manifest
let manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Fungsi untuk mengubah path
const updatePath = (path) => {
  if (path.startsWith("/")) {
    // Jika path dimulai dengan '/', tambahkan '.' di depan dan '/idrisiyyah' setelahnya
    return `.${path.replace(/^\//, "/idrisiyyah/")}`;
  } else if (!path.startsWith("./") && !path.startsWith("../")) {
    // Jika path tidak dimulai dengan './' atau '../', tambahkan './idrisiyyah/' di depannya
    return `./idrisiyyah/${path}`;
  }
  // Jika path sudah relatif (dimulai dengan './' atau '../'), biarkan apa adanya
  return path;
};

// Update path di objek files
manifest.files = Object.keys(manifest.files).reduce((acc, key) => {
  acc[key] = updatePath(manifest.files[key]);
  return acc;
}, {});

// Update entrypoints
manifest.entrypoints = manifest.entrypoints.map(updatePath);

// Tulis kembali file manifest yang sudah diupdate
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("asset-manifest.json has been updated successfully.");
