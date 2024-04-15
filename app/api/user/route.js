import { NextResponse } from "next/server"

export const GET = (req,res) => {
    return Response.json({res:"Its Get Message"})
} 





export const POST = async (req,res) => {
    const {id} = await req.json()
    return Response.json({res:"POST Request"})
}