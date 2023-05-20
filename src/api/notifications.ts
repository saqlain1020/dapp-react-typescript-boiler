import store from "src/state";
import { dismissNotification, dismissNotifications, notify } from "reapop";

const notifySuccess = (title: string, message: string) => {
  store.dispatch(
    notify({
      title,
      message,
      status: "success",
    })
  );
};

const notifyError = (title: string, message: string) => {
  store.dispatch(
    notify({
      title,
      message,
      status: "error",
      dismissible: true,
      dismissAfter: 0,
    })
  );
};

const notifyLoading = (title: string, message: string, options?: Partial<Notification>) => {
  const { payload: nt } = store.dispatch(
    notify({
      title,
      message,
      status: "loading",
      dismissAfter: 0,
      dismissible: false,
      ...options,
    })
  );
  return nt.id;
};

const dismissNotify = (id: string) => store.dispatch(dismissNotification(id));
const dismissNotifyAll = () => store.dispatch(dismissNotifications());

export { notifySuccess, notifyError, notifyLoading, dismissNotify, dismissNotifyAll };
