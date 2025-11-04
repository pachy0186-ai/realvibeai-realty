// scripts/set-beta-seats.ts
// Utility script to call the admin route to update the beta seat count.

import "dotenv/config";
import { fetch } from "undici";

const ADMIN_TOKEN = process.env.BETA_ADMIN_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/admin/beta-seats`
  : "http://localhost:3000/api/admin/beta-seats"; // Default for local testing

async function setBetaSeats() {
  const newSeats = parseInt(process.argv[2]);

  if (isNaN(newSeats) || newSeats < 0) {
    console.error("Usage: node scripts/set-beta-seats.ts <new_seat_count>");
    process.exit(1);
  }

  if (!ADMIN_TOKEN) {
    console.error("Error: BETA_ADMIN_TOKEN environment variable is not set.");
    process.exit(1);
  }

  console.log(`Attempting to set available seats to: ${newSeats}`);
  console.log(`Target API URL: ${API_URL}`);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ seats: newSeats }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Success! New seat count set.");
      console.log("Response:", data);
    } else {
      console.error(`Error: API returned status ${response.status}`);
      console.error("Response:", data);
    }
  } catch (error) {
    console.error("Error calling the admin API:", error);
  }
}

setBetaSeats();
