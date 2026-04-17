import sendMail from "../helper/sendMail";

// Define the shape of orderDetails for better type safety
interface OrderDetails {
  totalItems: number;
  totalPrice: number;
}

// Function to send a welcome email to a new administrator
export const sendWelcomeEmailToAdmin = (email: string, name: string): void => {
  const emailTemplate = {
    emailTo: email,
    subject: "Welcome Aboard - Team!",
    message: `
      <h1>Welcome, ${name}!</h1>
      <p>
        Thank you for joining the  team! We are thrilled to have you onboard as we continue to enhance our services. We look forward to exciting collaborations and impactful work.
      </p>
      <p>
        Best regards,<br/>
        The Gb Group Kingdom Team
      </p>
    `,
  };

  sendMail(emailTemplate);
};

// Function to send a password reset email
export const sendResetEmail = (
  email: string,
  name: string,
  link: string,
  resetCode: string | number
): void => {
  const emailTemplate = {
    emailTo: email,
    subject: "Password reset Code",
    message: `<h1>Dear ${name},</h1></br>
      <h3>Reset Code: ${resetCode}</h3><br>
      To reset your password click this link: ${link} <br>
      For any reason if the link is not working you can click reset password button below.<br><br>
      <a href="${link}" style="background-color:#ad498c;width:8rem;height:2rem;padding:8px;color:white;font-weight:600;border-radius:10px;text-decoration:none;">
      Reset Password
      </a><br><br>
      Reset password code is only valid for <b>15 minutes</b>.
      <br/><br/>
      The Gb Group Kingdom System And Exhibition Team<br/>`,
  };

  sendMail(emailTemplate);
};

// Function to send an email to the person who made an order
export const sendEmailPersonBookedArts = (
  email: string,
  name: string,
  orderDetails: OrderDetails
): void => {
  const emailTemplate = {
    emailTo: email,
    subject: "Order Confirmation!",
    message: `
      <p>Hi ${name},</p>
      <p>Your Arts order for ${orderDetails.totalItems} items has been successfully placed!</p>
      <p>Total price: ${orderDetails.totalPrice} FRW</p>
      <p>Thank you for your purchase. We will notify you once your items are shipped.</p>
    `,
  };

  sendMail(emailTemplate);
};

// Approve Message for artist/tech role
export const sendEmailApproveArts = (
  email: string,
  name: string,
  role: string,
  updatedAt: Date | string
): void => {
  const emailTemplate = {
    emailTo: email,
    subject: "Approval Confirmation!",
    message: `
      <p>Hi ${name},</p>
      <p>Congratulations! Your request to become an ${role} has been approved.</p>
      <p>As of ${updatedAt}, you can now customize your dashboard and start showcasing your art.</p>
      <p>Thank you for joining us. We look forward to seeing your amazing work!</p>
    `,
  };

  sendMail(emailTemplate);
};

// Approve Message for admin role
export const sendEmailAdminApproveArts = (
  email: string,
  name: string,
  updatedAt: Date | string
): void => {
  const emailTemplate = {
    emailTo: email,
    subject: "Approval Confirmation!",
    message: `
    <p>Hi ${name},</p>
    <p>Congratulations! Your request to become an Admin has been approved.</p>
    <p>As of ${updatedAt}, you now have administrative privileges.</p>
    <p>Thank you for your dedication and willingness to help manage our platform. We look forward to your valuable contributions!</p>
  `,
  };

  sendMail(emailTemplate);
};