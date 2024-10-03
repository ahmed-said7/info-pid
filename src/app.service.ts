import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  siteHealthy(): boolean {
    return true;
  }
}
