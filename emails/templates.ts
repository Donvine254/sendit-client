// Add html templates for emails

import { OrderDetails } from "@/types";

export const orderConfirmationEmail = ({
  ...props
}: OrderDetails) => `<div style="margin:5px auto; max-width: 768px; padding:5px;">
  <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png" alt="Sendit Logo" height="50" width="200" style="margin: 5px auto"/>
  </div>
  <h3 style="font-weight:bold; color:#2563eb"> Your Parcel Delivery Order with Sendit is Confirmed! 🚚</h3>
  <p>Hi ${props.name},</p>
  <p>Thank you for choosing Sendit! We’re excited to help you send your parcel conveniently and securely</p>
  <p>Here are the details of your order:</p>
  <h4>Order Details:</h4>
   <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Order Reference Number:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">#${props.orderId}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Pickup Address:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.pickupAddress}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Recipient:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.recipient}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Delivery Address:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.deliveryAddress}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Parcel Description:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.parcelDescription}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Parcel Weight:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.parcelWeight}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Estimated Delivery Fee:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">KES ${props.totalPrice}</td>
    </tr>
  </table>
  <h4>Important Information</h4>
  <ul>
    <li><strong>Packaging Tips:</strong> Properly package your parcel to ensure its safety during transit. <a href="https://senditkenya.vercel.app/help/packaging-tips" style="color: #2563eb;">Click here</a> for tips on how to package your items securely.</li>
    <li><strong>Weight Verification:</strong> The price is based on the weight you provided during the order. Our team will weigh the parcel at pickup, and the final price may be adjusted if there is a discrepancy.</li>
    <li><strong>FAQs and Pricing:</strong> For more details about our pricing and policies, please visit our <a href="https://senditkenya.vercel.app/faqs" style="color: #2563eb;">FAQs</a> and <a href="https://senditkenya.vercel.app/pricing" style="color: #2563eb;">Pricing Page</a>.</li>
  </ul>
<a href="https://senditkenya.vercel.app/me/orders/${props.orderId}" style="display:block; background-color:#2563eb; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:50%; margin:10px auto; text-decoration:none;">View Your Order </a>
  <p>If you have any questions or need further assistance, feel free to contact our support team. We're here to help!</p>
  <p>Thank you for trusting Sendit. We’re committed to delivering your parcel with care!</p>
  <p>Warm regards,</p>
  <p>The Sendit Team 🚚</p>
  <small>This email is for information purposes only. Kindly do not reply to this email.</small>
  <hr style="border-color: #2563eb"/>
  <footer style="font-size: 12px; padding: 5px; margin: 10px 0px; text-align:center; ">  
    <table align="center" style="margin: 10px auto;">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" alt="Facebook" width="30" height="30">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/diamonddegesh" title="Twitter">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" alt="Twitter" width="30">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://instagram.com/Donvine254" title="Instagram">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png" alt="Instagram" width="30" height="30">
          </a>
        </td>
      </tr>
    </table>
    <p style="font-weight:bold; color:#2563eb">123 Kimathi Street, Nairobi, Kenya</p>
    <p><a href="https://senditkenya.vercel.app/privacy">Privacy Policy</a> | <a href="https://senditkenya.vercel.app/help">Contact Details</a></p>
  </footer>
</div>`;

export const invoiceReminderEmailTemplate = ({
  invoice_number,
  fullName,
  shipping_address,
  item,
  amount,
}: {
  invoice_number: number;
  fullName: string;
  shipping_address: string;
  item: string;
  email?: string;
  phone?: string;
  amount: number;
}) => `<div style="margin: 5px auto; max-width: 768px; padding: 5px;">
  <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png" alt="Sendit Logo" height="50" width="200" style="margin: 5px auto"/>
  </div>
  <h3 style="font-weight: bold; color: #2563eb;"> Payment Reminder: Invoice #${invoice_number}</h3>
  <p>Hi ${fullName},</p>
  <p>This is a friendly reminder that payment is due for the following invoice:</p>
  <h4>Invoice Details:</h4>
  <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Invoice Number:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">#${invoice_number}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Recipient Name:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Shipping Address:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${shipping_address}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Item Description:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${item}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Total Amount:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">KES ${amount}</td>
    </tr>
  </table>
  <p>To avoid any service interruptions, please settle the payment as soon as possible.</p>
  <a href="https://senditkenya.vercel.app/api/invoices/download/${invoice_number}" style="display: block; background-color: #2563eb; color: #fff; padding: 10px 5px; border-radius: 5px; text-align: center; width: 50%; margin: 10px auto; text-decoration: none;">
    Download Invoice
  </a>
  <p>If you have already made the payment, please ignore this email. If you have any questions or need assistance, feel free to contact us.</p>
  <p>Thank you for your prompt attention to this matter!</p>
  <p>Best regards,</p>
  <p>The Sendit Kenya Team</p>
  <small>This email is for informational purposes only. Please do not reply to this email.</small>
  <hr style="border-color: #2563eb;"/>
  <footer style="font-size: 12px; padding: 5px; margin: 10px 0px; text-align: center;">
    <p style="font-weight: bold; color: #2563eb;">123 Kimathi Street, Nairobi, Kenya</p>
    <p><a href="https://senditkenya.vercel.app/privacy">Privacy Policy</a> | <a href="https://senditkenya.vercel.app/contact">Contact Details</a></p>
  </footer>
</div>`;
