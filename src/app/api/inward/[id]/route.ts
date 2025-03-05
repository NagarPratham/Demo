import { NextResponse } from "next/server";
import Inward from "../../../models/Inward";
import connectMongo from "../../../lib/mongodb";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectMongo();

    const { id } = params; // This is now the customId, not the MongoDB _id

    try {
        // Retrieve the request body
        const updatedData = await request.json();

        // Ensure required fields are present
        if (!updatedData.inwardType || !updatedData.letterDate || !updatedData.receivedDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Find and update the document based on customId
        const updatedInward = await Inward.findOneAndUpdate(
            { customId: id },  // Find by customId
            updatedData,
            { new: true }
        );

        if (!updatedInward) {
            return NextResponse.json({ error: "Inward entry not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Inward updated successfully", data: updatedInward }, { status: 200 });
    } catch (error) {
        console.error("Error updating inward:", error);
        return NextResponse.json({ error: "Failed to update inward" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    await connectMongo();

    const { id } = params; // This is now the customId, not the MongoDB _id

    try {
        // Find and delete the document based on customId
        const deletedInward = await Inward.findOneAndDelete({ customId: id });

        if (!deletedInward) {
            return NextResponse.json({ error: "Inward entry not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Inward deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting inward:", error);
        return NextResponse.json({ error: "Failed to delete inward" }, { status: 500 });
    }
}
