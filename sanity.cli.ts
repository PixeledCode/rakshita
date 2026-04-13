import { defineCliConfig } from "sanity/cli";

// Used only for `pnpm typegen` — not a studio config.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    overloadClientMethods: true,
    generates: "./src/sanity/types.ts",
  },
});
