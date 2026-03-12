import { query } from "./_generated/server"
import { authComponent } from "./auth"

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.safeGetAuthUser(ctx)
  },
})
