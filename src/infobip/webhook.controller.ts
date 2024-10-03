import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("webhook")
export class WebhookController {
  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    console.log("Incoming webhook data:", req.body); // Log incoming data

    // Process the incoming data based on event type
    // e.g., checking for message delivery status or user responses
    const eventType = req.body.type;
    console.log("Event Type:", eventType);

    // Example handling for a response
    if (eventType === "RESPONSE") {
      const userResponse = req.body.message.text; // Adjust based on actual payload
      console.log("User responded with:", userResponse);
    }

    // Respond to Infobip
    res.status(200).send("Webhook received");
  }
}
