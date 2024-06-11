/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://ai-interview-mocker_owner:oakPejcO09hX@ep-frosty-boat-a1sqdivk.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require"
    }
  };