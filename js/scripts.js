/*
  ============================================================
  ZEHUB SCRIPT LIST
  ============================================================

  ADD A NEW SCRIPT:
  1. Copy one object below.
  2. Change name, description, category, features and loadstring.
  3. Save this file and push it to GitHub.
  4. The website will automatically create the new card.

  IMPORTANT:
  Put the EXACT loadstring you want copied in `loadstring`.
  Example:
    loadstring(game:HttpGet("https://example.com/Loader.lua"))()

  Categories currently supported:
    combat
    utility
    simulator

  You can add more categories; the filter button can be added in index.html.
  ============================================================
*/

const scripts = [
  {
    name: "Rivals",
    description: "ZeHub tools and features for RIVALS.",
    category: "combat",
    icon: "R",
    status: "Live",
    features: ["RIVALS", "ZeHub", "Updated"],
    loadstring: `-- ADD YOUR RIVALS LOADSTRING HERE`
  },

  {
    name: "Loot To Forge",
    description: "ZeHub script for Loot To Forge.",
    category: "utility",
    icon: "L",
    status: "Live",
    features: ["Loot To Forge", "ZeHub", "Updated"],
    loadstring: `-- ADD YOUR LOOT TO FORGE LOADSTRING HERE`
  },

  {
    name: "Runaways",
    description: "ZeHub script and utilities for Runaways.",
    category: "utility",
    icon: "R",
    status: "Live",
    features: ["Runaways", "ZeHub", "Updated"],
    loadstring: `-- ADD YOUR RUNAWAYS LOADSTRING HERE`
  }
];
