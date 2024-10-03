import { Injectable } from "@nestjs/common";
import { https } from "follow-redirects";
import { Buffer } from "buffer";

@Injectable()
export class InfobipService {
  private readonly apiKey =
    "App 272fd13790cd08a5448618d81540c061-c901e7f2-b84e-46eb-9d4b-345cf3b4c2dd"; // Your API key
  private readonly hostname = "v3vgzr.api.infobip.com";
  private readonly interactivePath = "/whatsapp/1/message/interactive/buttons"; // Path for interactive button messages
  private readonly imagePath = "/whatsapp/1/message/image"; // Path for image messages
  private readonly textPath = "/whatsapp/1/message/text"; // Path for text messages

  // Method to send an image message
  async sendImage(to: string, imageUrl: string, caption: string): Promise<any> {
    const postData = JSON.stringify({
      from: "447860099299", // Your sender number
      to: to,
      content: {
        mediaUrl: imageUrl, // Image URL
        caption: caption, // Image caption (optional)
      },
    });

    return this.sendRequest(this.imagePath, postData);
  }

  // Method to send interactive buttons with an optional image
  async sendInteractiveButtonsWithImage(
    to: string,
    messageId: string,
    caption: string
  ): Promise<any> {
    const imageUrl =
      "https://ardapps.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-29-at-17.38.17.jpeg"; // Static URL for the image

    const postData = JSON.stringify({
      from: "447860099299", // Your sender number
      to: to,
      messageId: messageId,
      content: {
        header: {
          type: "IMAGE", // Specify that the header contains an image
          mediaUrl: imageUrl, // Static URL for the image
          caption: caption, // Caption for the image
        },
        body: {
          text: "Are you coming to the meeting?", // Fixed text
        },
        action: {
          buttons: [
            {
              type: "REPLY",
              id: "1",
              title: "Yes",
              callbackData: "yes_postback", // Use callbackData for identification
            },
            {
              type: "REPLY",
              id: "2",
              title: "No",
              callbackData: "no_postback", // Use callbackData for identification
            },
          ],
        },
        footer: {
          text: "Misk Invitation",
        },
      },
      callbackData: "Callback data", // Optional callback data
    });

    return this.sendRequest(this.interactivePath, postData);
  }

  // Method to send a text message reply
  async sendTextMessage(to: string, message: string): Promise<any> {
    const postData = JSON.stringify({
      from: "447860099299", // Your WhatsApp sender number
      to: to, // Recipient's phone number
      content: {
        text: message, // The message to send
      },
    });

    return this.sendRequest(this.textPath, postData);
  }

  // Generic method to send HTTP requests using HTTPS
  private sendRequest(path: string, postData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        hostname: this.hostname,
        path: path,
        headers: {
          Authorization: this.apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        maxRedirects: 20,
      };

      const req = https.request(options, (res) => {
        let chunks: Buffer[] = [];

        res.on("data", (chunk) => {
          chunks.push(chunk);
        });

        res.on("end", () => {
          const body = Buffer.concat(chunks).toString();
          console.log("Response Body:", body); // Log response body for debugging
          resolve(body);
        });

        res.on("error", (error) => {
          console.error("Response Error:", error);
          reject(`Response Error: ${error}`);
        });
      });

      req.on("error", (error) => {
        console.error("Request Error:", error.message);
        reject(`Request Error: ${error.message}`);
      });

      req.write(postData);
      req.end();
    });
  }
}
