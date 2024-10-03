import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InfobipService } from "./infobip/infobip.service";
import { InfobipController } from "./infobip/infobip.controller";
import { WebhookController } from "./infobip/webhook.controller";

@Module({
  imports: [],
  controllers: [AppController, InfobipController, WebhookController],
  providers: [AppService, InfobipService],
})
export class AppModule {}
