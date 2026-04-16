import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  // Simple, ReDoS-safe email validation
  const atIndex = email.indexOf("@");
  if (atIndex < 1) return false;
  const domain = email.slice(atIndex + 1);
  const dotIndex = domain.lastIndexOf(".");
  return dotIndex > 0 && dotIndex < domain.length - 1;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    const { name, email, message } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // In a real app, you'd send an email or save to DB here.
    // For example: await sendEmail({ to: "hello@rabiro.com", ...body });
    console.log("New contact form submission:", {
      name: name.trim(),
      email: email.trim(),
      company: body.company?.trim() ?? "",
      service: body.service ?? "",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received. We'll be in touch soon!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
