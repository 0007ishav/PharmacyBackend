import { resend } from "@/lib/resend"
import verificationEmail from "../../emails/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> // <---- This is return type
{
    try {
        await resend.emails.send({
            from: 'Mystry Message<onboarding@resend.dev>',
            to: email,
            subject: 'Mystry message | Verification code',
            react: verificationEmail({ username, otp: verifyCode}),
          });

        return {success: true, message: "Verification email send successfully"}
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: "Fail to send verification email"}
    }
}
