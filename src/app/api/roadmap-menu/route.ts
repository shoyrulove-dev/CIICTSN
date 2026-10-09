import {NextResponse} from "next/server";
import {getRoadmapModules} from "@/lib/content";
export async function GET(){const items=await getRoadmapModules();return NextResponse.json({items:items.map(({slug,title,number})=>({slug,title,number}))},{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}})}
