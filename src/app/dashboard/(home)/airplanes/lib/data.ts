"use server"
import prisma from "../../../../../../lib/prisma"

export async function getAirplanes() { // fetching data planes
    try {
        const planes = await prisma.airplane.findMany({})
        return planes
    } catch (error) {
        console.log("Database Error: ",error)
        return []
    }
}