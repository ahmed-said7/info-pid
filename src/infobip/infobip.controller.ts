import { Controller, Post, Body } from "@nestjs/common";
import { InfobipService } from "./infobip.service";

@Controller("infobip")
export class InfobipController {
  constructor(private readonly infobipService: InfobipService) {}

  @Post("send")
  async sendInteractiveMessage(
    @Body()
    body: {
      phone: string;
      messageId: string;
      imageUrl: string;
      caption: string;
    }
  ) {
    return this.infobipService.sendInteractiveButtonsWithImage(
      body.phone,
      body.messageId,
      body.imageUrl // Pass image URL
    );
  }
  @Post("webhook")
  async webhook(
    @Body()
    body: any,
  ) {
    console.log(body);
  }
}
