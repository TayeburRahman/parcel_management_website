interface ParcelEmailTemplateData {
    name: string;
    shipmentId: string;
    pickupAddress: string;
    deliveryAddress: string;
    parcelType: string;
    paymentMethod: string;
    qrCodeUrl: string;
}

const parcelEmailTemplate = (data: ParcelEmailTemplateData): string => `
<html>
  <head>
    <style>
      body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 30px 20px;
        background-color: #ffffff;
        border-radius: 8px;
        text-align: center;
      }
      .header {
        font-size: 20px;
        font-weight: 600;
        color: #007bff;
        margin-bottom: 20px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        margin: 10px 0;
      }
      .details {
        text-align: left;
        margin: 20px 0;
        padding: 15px;
        background-color: #f4f4f4;
        border-radius: 6px;
      }
      .details p {
        margin: 5px 0;
      }
      .qr-code {
        margin: 20px 0;
      }
      .footer {
        font-size: 14px;
        color: #999;
        margin-top: 30px;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Parcel Booking Confirmation</div>
      <div class="content">
        <p>Hello, ${data.name}</p>
        <p>Your parcel has been successfully booked! Here are the details:</p>
        <div class="details">
          <p><strong>Shipment ID:</strong> ${data.shipmentId}</p>
          <p><strong>Pickup Address:</strong> ${data.pickupAddress}</p>
          <p><strong>Delivery Address:</strong> ${data.deliveryAddress}</p>
          <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
          <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        </div>
        <div class="qr-code">
          <p>Scan the QR code below to track your parcel:</p>
          <img src="${data.qrCodeUrl}" alt="Parcel QR Code" width="120" height="120"/>
        </div>
        <p>Thank you for choosing our service!</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Parcel Management System | 
        <a href="https://website.com/privacy">Privacy Policy</a> | 
        <a href="https://website.com/contact">Contact Support</a>
      </div>
    </div>
  </body>
</html>
`;

export { parcelEmailTemplate };
