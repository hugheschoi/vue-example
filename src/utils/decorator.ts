import Vue from "vue";
interface ConfirmationConfig {
  title: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  options?: object;
  type?: string;
}
export function Confirmation(config: ConfirmationConfig) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = target[name];
    let _instance: any = null;
    descriptor.value = function (...args: any[]) {
      Vue.prototype
        .$confirm(
          config.message,
          config.title,
          Object.assign(
            {
              type: "warning",
              beforeClose: (action: string, instance: any, done: any) => {
                _instance = instance;
                instance.confirmButtonLoading = true;
                if (action === "confirm") {
                  fn.call(this, instance, done, ...args);
                } else {
                  done();
                }
              },
            },
            config.options || {}
          )
        )
        .then(() => {
          _instance.confirmButtonLoading = false;
        });
    };
    return descriptor;
  };
}

export function Validate(refName: string) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = target[name]; // 被装饰的方法
    descriptor.value = function (...args: any[]) {
      // 将触发校验的代码封装在此
      (this as any).$refs[refName].validate((valid: boolean) => {
        if (valid) {
          fn.call(this, ...args); // 在这里调用“被装饰的方法”
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
  };
}

export function CatchError() {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = target[name];
    descriptor.value = async function (...args: any[]) {
      try {
        await fn.call(this, ...args);
      } catch (error) {
        console.log("error", error);
      }
    };
    return descriptor;
  };
}
