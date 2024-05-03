"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function addBlog(formData) {
    const image_url = formData.get("imageUrl")
    const title = formData.get("title")
    const body = formData.get("article")
    const url = formData.get("article_url")
    const cookieStore = cookies();
    const supabase = createServerActionClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    if (!user) {
        console.error("user is not authenticated")
        return;
    }
    const { data, error } = await supabase.from('blog2buzz')
        .insert([
            {
                title,
                body,
                url,
                image_url,
                user_id: user.id
            }


        ])
        console.log("Saved")
    if (error) {
        console.error(`Error Happend ${error.message}`)
        return;
    }
    revalidatePath("/saved")
    return { message: "success" }
}