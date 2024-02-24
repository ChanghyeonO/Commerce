import { SweetAlertIcon } from "sweetalert2";

const alertList = {
  successMessage: (title: string) => ({
    title: `${title}`,
    icon: "success" as SweetAlertIcon,
    confirmButtonText: "확인",
    confirmButtonColor: "#5271ff",
  }),

  errorMessage: (title: string) => ({
    title: `${title}`,
    icon: "error" as SweetAlertIcon,
    confirmButtonText: "확인",
    confirmButtonColor: "#5271ff",
  }),

  infoMessage: (title: string) => ({
    title: `${title}`,
    icon: "info" as SweetAlertIcon,
    confirmButtonText: "확인",
    confirmButtonColor: "#5271ff",
  }),

  doubleCheckMessage: (title: string) => ({
    title: `${title}`,
    icon: "info" as SweetAlertIcon,
    showCancelButton: true,
    confirmButtonColor: "#5271ff",
    cancelButtonColor: "#2F2F2F",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }),

  doubleCheckTitkeMsg: (title: string, text: string) => ({
    title: `${title}`,
    text: `${text}`,
    icon: "info" as SweetAlertIcon,
    showCancelButton: true,
    confirmButtonColor: "#5271ff",
    cancelButtonColor: "#2F2F2F",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }),

  customMessage: (title: string, text: string) => ({
    title: `${title}`,
    html: `${text}`,
    icon: "success" as SweetAlertIcon,
    confirmButtonText: "확인",
    confirmButtonColor: "#5271ff",
  }),
};

export default alertList;
