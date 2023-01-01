import SmeeClient from "smee-client";

const smee = new SmeeClient({
  source: "https://smee.io/L7LpuHnvQS8LbT0",
  target: "http://localhost:3000/api/events/presence",
  logger: console,
});

const events = smee.start();
