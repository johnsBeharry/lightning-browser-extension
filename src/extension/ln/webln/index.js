export default class WebLNProvider {
  constructor() {
    this.enabled = false;
    this.isEnabled = false; // seems some webln implementations use webln.isEnabled and some use webln.enabled
    this.executing = false;
  }

  enable() {
    if (this.enabled) {
      return Promise.resolve({ enabled: true });
    }
    return this.execute("enable").then((result) => {
      this.enabled = result.enabled;
      this.isEnabled = result.enabled;
      return result;
    });
  }

  getInfo() {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling getInfo");
    }
    return this.execute("getInfo");
  }

  getTransactions() {
    if (!this.enabled) {
      throw new Error(
        "Provider must be enabled before calling getTransactions"
      );
    }
    return this.execute("getTransactions");
  }

  lnurl(lnurlEncoded) {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling lnurl");
    }
    return this.execute("lnurl", { lnurlEncoded });
  }

  sendPayment(paymentRequest) {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling sendPayment");
    }
    return this.execute("sendPayment", { paymentRequest });
  }

  makeInvoice(args) {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling makeInvoice");
    }
    if (typeof args !== "object") {
      args = { amount: args };
    }

    return this.execute("makeInvoice", args);
  }

  signMessage(message) {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling signMessage");
    }

    return this.execute("signMessage", { message });
  }

  verifyMessage(signature, message) {
    if (!this.enabled) {
      throw new Error("Provider must be enabled before calling verifyMessage");
    }

    return this.execute("verifyMessage", { signature, message });
  }

  execute(type, args) {
    const p = new Promise((resolve, reject) => {
      // post the request to the content script. from there it gets passed to the background script and back
      // in page script can not directly connect to the background script
      window.postMessage(
        {
          application: "LBE",
          prompt: true,
          //action: `webln/${type}`, // TODO: think about a convention to cal the actions
          type: `${type}`,
          args,
        },
        "*" // TODO use origin
      );

      function handleWindowMessage(messageEvent) {
        // check if it is a relevant message
        // there are some other events happening
        if (
          !messageEvent.data ||
          !messageEvent.data.response ||
          messageEvent.data.application !== "LBE"
        ) {
          return;
        }
        if (messageEvent.data.data.error) {
          reject(new Error(messageEvent.data.data.error));
        } else {
          // 1. data: the message data
          // 2. data: the data passed as data to the message
          // 3. data: the actual response data
          resolve(messageEvent.data.data.data);
        }
        // For some reason must happen only at the end of this function
        window.removeEventListener("message", handleWindowMessage);
      }

      window.addEventListener("message", handleWindowMessage);
    });
    return p;
  }
}
