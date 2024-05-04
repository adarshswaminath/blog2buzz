"use client"
import {Auth} from "@supabase/auth-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {ThemeSupa} from "@supabase/auth-ui-shared"
function LoginForm() {
  const supabaseClient = createClientComponentClient()
  return (
    <main className="flex flex-col h-72 w-96 p-3 justify-center bg-background rounded-lg">
       <Auth
        supabaseClient={supabaseClient}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo='https://blog2buzz.vercel.app/auth/callback'
        appearance={{ theme: ThemeSupa}}/>
    </main>
  )
}

export default LoginForm 