import { redirect } from "next/navigation"
import { signIn, providerMap } from "@/auth"
import { AuthError } from "next-auth"
 
export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <div className="flex flex-col gap-2">
       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome !!!</h1>
      
      {Object.values(providerMap).map((provider) => (
        <form
        key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: "/dashboard",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect("/")
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <div className="flex items-center justify-center mt-6">
      <button
        type="submit"
        className="flex items-center bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm hover:bg-gray-100 transition duration-300"
      >
        <img
          src="/images/google-icon.svg" // Path to your Google icon
          alt="Google Logo"
          className="h-5 w-5 mr-2"
        />
        Sign in with Google
      </button>
    </div>
        </form>
      ))}
      </div>
    </div>
  )
}