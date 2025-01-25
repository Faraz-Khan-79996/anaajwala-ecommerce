const nodemailer = require("nodemailer");


/**
 * Sends an order email with details.
 * @param {string} name - The name of the customer.
 * @param {string} address - The address of the customer.
 * @param {string} phone - The phone number of the customer.
 * @param {Array} items - An array of items, where each item contains { name, texture, quantity }.
 */
async function sendOrderEmail(name, address, phone, items) {
    // Define the hardcoded email address
    const recipientEmail = "farazgod1234@gmail.com";
    const anajwalaEmail = "ceoanajwala@gmail.com"

    // Generate the current timestamp
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const timestamp = formatter.format(new Date());
    // Construct the HTML email body
    const itemDetails = items.map(
        (item, index) => `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.productName}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.texture}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
            </tr>
        `
    ).join("");

    const message = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">New Order Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Order Time:</strong> ${timestamp}</p>
            <h3 style="margin-top: 20px;">Items Ordered:</h3>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd;">#</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Product</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Texture</th>
                        <th style="padding: 8px; border: 1px solid #ddd;">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemDetails}
                </tbody>
            </table>
            <p style="margin-top: 20px;">Thank you for placing your order!</p>
        </div>
    `;

    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL, // Replace with your email
            pass: process.env.GMAIL_APP_PASSWORD, // Replace with your email's app password
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.FROM_EMAIL, // Replace with your email
        to: recipientEmail,
        subject: "New Order Received",
        html: message, // Use the HTML content here
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Order email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendOrderEmail;
