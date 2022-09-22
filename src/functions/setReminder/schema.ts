export default {
  type: "object",
  properties: {
    email: { type: "string" },
    phoneNumber: { type: "string" },
    reminder: { type: "string", description: "what to remind" },
    reminderDate: { type: "string", description: "when to remind" },
  },
  required: ["email", "phoneNumber", "reminder", "reminderDate"],
} as const;
