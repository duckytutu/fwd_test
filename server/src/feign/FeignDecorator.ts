import formatUnicorn from "format-unicorn/safe";

async function httpInvoke(
  ths: any,
  method: string,
  url: string,
  param: any,
  body: any
): Promise<any> {
  const axois = ths._axios;
  for (const key in param) {
    const value = param[key];
    param[key] = encodeURI(value);
  }
  const fmtUrl = formatUnicorn(url, param);
  const rt = await axois[method](fmtUrl, body);
  return rt.data;
}

export function get(url: string) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.value = async function (param: any, body?: any): Promise<any> {
      const rt = await httpInvoke(this, "get", url, param, body);
      return rt;
    };
    return descriptor;
  };
}

export function post(url: string) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.value = async function (param: any, body?: any): Promise<any> {
      const rt = await httpInvoke(this, "post", url, param, body);
      return rt;
    };
    return descriptor;
  };
}

export function put(url: string) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.value = async function (param: any, body?: any): Promise<any> {
      const rt = await httpInvoke(this, "put", url, param, body);
      return rt;
    };
    return descriptor;
  };
}

export function del(url: string) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.value = async function (param: any, body?: any): Promise<any> {
      const rt = await httpInvoke(this, "delete", url, param, body);
      return rt;
    };
    return descriptor;
  };
}
