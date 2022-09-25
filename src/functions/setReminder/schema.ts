export default {
  type: "object",
  properties: {
    email: { type: "string" },
    phoneNumber: { type: "string" },
    reminder: { type: "string", description: "what to remind" },
    reminderDate: {
      type: "number",
      description:
        "when to remind - the client should provide date in UNIX timestamp in seconds",
    },
  },
  required: ["email", "phoneNumber", "reminder", "reminderDate"],
} as const;
