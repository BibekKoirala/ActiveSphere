"server only"
import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import google from "next-auth/providers/google"
 
const providers: Provider[] = [
  google,
]
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
})

export { auth, signIn, signOut}
export const {GET, POST} = handlers