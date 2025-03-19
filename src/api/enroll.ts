import { Registration } from "@/components/CoursesForm/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data: Registration = await request.json();

    // Validate the required fields
    const requiredFields = [
      "firstname",
      "lastname",
      "email",
      "phoneNumber",
      "state",
      "courseId",
    ];
    for (const field of requiredFields) {
      if (!data[field as keyof Registration]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Forward the request to the external API
    const response = await fetch(
      "https://admin.studysmart.pro/academy/enroll",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { success: false, message: errorData.message || "Registration failed" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error processing registration:", error);
    return NextResponse.json(
      { success: false, message: "Server error processing registration" },
      { status: 500 }
    );
  }
}
