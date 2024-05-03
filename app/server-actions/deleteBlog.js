"use server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function deleteBlog(formData) {
    const blogId = formData.get('id')
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession()
    const user = session?.user
    if(!user){
        console.log("User not authenticated")
        return;
    }

    const {error} = await supabase
    .from('blog2buzz')
    .delete()
    .match({id: blogId,user_id: user.id})
    if(error) {
        console.log("Something went wrong",error)
        return;
    }
    revalidatePath("/saved")
    return {message: "Success"}
}