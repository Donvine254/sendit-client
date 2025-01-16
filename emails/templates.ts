// Add html templates for emails

import { OrderDetails } from "@/types";
import { Invoice } from "@prisma/client";

export const orderConfirmationEmail = ({
  ...props
}: OrderDetails) => `<div style="margin:5px auto; max-width: 768px; padding:5px;">
  <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png" alt="Sendit Logo" height="50" width="200" style="margin: 5px auto"/>
  </div>
  <h2 style="font-weight:bold; color:#2563eb"> Your Parcel Delivery Order with Sendit is Confirmed! 🚚</h2>
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
    <p><a href="https://senditkenya.vercel.app/privacy">Privacy Policy</a> | <a href="https://senditkenya.vercel.app/contact">Contact Details</a></p>
  </footer>
</div>`;

export const invoiceReminderEmailTemplate = ({
  ...props
}: Invoice) => `<div style="margin: 5px auto; max-width: 768px; padding: 5px;">
  <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png" alt="Sendit Logo" height="50" width="200" style="margin: 5px auto"/>
  </div>
  <h2 style="font-weight: bold; color: #2563eb;"> Payment Reminder for Invoice #${props.invoice_number}</h2>
  <p>Hi ${props.fullName},</p>
  <p>This is a friendly reminder that payment is due for the following invoice:</p>
  <h4>Invoice Details:</h4>
  <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Invoice Number:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">#00${props.invoice_number}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Recipient Name:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.fullName}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Shipping Address:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.shipping_address}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Item Description:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${props.item}</td>
    </tr>
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Total Amount:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">KES ${props.amount}</td>
    </tr>
  </table>
  <p>To avoid any service interruptions, please settle the payment as soon as possible.</p>
  <a href="https://senditkenya.vercel.app/api/invoices/download/${props.id}" style="display: block; background-color: #2563eb; color: #fff; padding: 10px 5px; border-radius: 5px; text-align: center; width: 50%; margin: 10px auto; text-decoration: none;">
    Download Invoice
  </a>
  <p>If you have already made the payment, please ignore this email. If you have any questions or need further assistance, feel free to contact our support team. We're here to help!</p>
  <p>Thank you for trusting Sendit. We’re committed to delivering your parcel with care!</p>
  <p>Warm regards,</p>
  <p>The Sendit Team 🚚</p>
  <small>This email is for informational purposes only. Please do not reply to this email.</small>
  <hr style="border-color: #2563eb;"/>
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
    <p><a href="https://senditkenya.vercel.app/privacy">Privacy Policy</a> | <a href="https://senditkenya.vercel.app/contact">Contact Details</a></p>
  </footer>
</div>`;

export const OrderCancellationTemplate = ({
  ...props
}: OrderDetails) => `<div style="margin:5px auto; max-width: 768px; padding:5px;">
  <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697144067/logos/sendit-logo.png" alt="Sendit Logo" height="50" width="200" style="margin: 5px auto"/>
  </div>
  <h2 style="font-weight:bold; color:#2563eb"> Your Parcel Delivery Order has been Cancelled ❌</h2>
  <p>Hi ${props.name},</p>
  <p>Your cancellation request for order #${props.orderId} has been processed successfully. Please let us know the reason for cancellation to help us improve our services.</p>
  <p>Here are the details of your order:</p>
  <h4>Cancelled Items:</h4>
   <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
    <tr>
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Order Number:</td>
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
      <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Delivery Fee:</td>
      <td style="padding: 8px; border: 1px solid #ddd;">KES ${props.totalPrice}</td>
    </tr>
  </table>
<a href="https://senditkenya.vercel.app/me/orders/${props.orderId}" style="display:block; background-color:#2563eb; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:50%; margin:10px auto; text-decoration:none;">View Your Order </a>
  <p>If you have any questions or need further assistance, feel free to contact our support team. We're here to help!</p>
  <p>Thank you for trusting Sendit. We’re committed to delivering your parcel with care!</p>
  <p>Warm regards,</p>
  <p>The Sendit Team 🚚</p>
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
    <p><a href="https://senditkenya.vercel.app/privacy">Privacy Policy</a> | <a href="https://senditkenya.vercel.app/contact">Contact Details</a></p>
  </footer>
</div>`;
