import { createSharedComposable } from "@vueuse/core";
import { Notyf } from "notyf";

export const useNotyf = createSharedComposable((x = "right", y = "bottom") => {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x,
      y,
    },
  });

  return {
    dismiss: (notification) => {
      notyf.dismiss(notification);
    },
    dismissAll: () => {
      notyf.dismissAll();
    },
    success: (payload) => {
      notyf.dismissAll();
      if (typeof payload === "string") return notyf.success(payload);

      return notyf.success(payload);
    },
    error: (payload) => {
      notyf.dismissAll();
      if (typeof payload === "string") return notyf.error(payload);

      return notyf.error(payload);
    },
    info: (payload) => {
      const options = {
        type: "info",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    warning: (payload) => {
      const options = {
        type: "warning",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    primary: (payload) => {
      const options = {
        type: "primary",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    purple: (payload) => {
      const options = {
        type: "purple",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    blue: (payload) => {
      const options = {
        type: "blue",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    green: (payload) => {
      const options = {
        type: "green",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
    orange: (payload) => {
      const options = {
        type: "orange",
      };

      if (typeof payload === "string") options.message = payload;
      else Object.assign(options, payload);

      return notyf.open(options);
    },
  };
});
