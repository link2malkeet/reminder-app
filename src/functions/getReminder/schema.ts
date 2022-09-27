export default {
  type: "object",
  properties: {
    userId: { type: "string", description: "this is user email" },
  },
  required: ["userId"],
} as const;
