"use client"
import {Auth} from "@supabase/auth-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
function LoginForm() {
  const supabase = createClientComponentClient()
  return (
    <main className="flex flex-col h-72 w-96 p-3 justify-center bg-background rounded-lg">
       <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo='http://localhost:3000/auth/callback'
        appearance={{
            theme: 'dark',
            button: {
                className: 'bg-white btn'
            },
            input: {
                className: 'bg-gray-700 border-gray-600 text-white'
            }
        }}/>
    </main>
  )
}

export default LoginForm