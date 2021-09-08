import { AxiosInstance } from "axios";

export class FeignBuilder {
  public axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  target<T>(clazz: new () => T): T {
    const rt = new clazz();
    (rt as any)._axios = this.axios;
    return rt;
  }
}
