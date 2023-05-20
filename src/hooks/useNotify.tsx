import { useCallback } from "react";
import { useNotifications, Notification } from "reapop";

const useNotify = () => {
    const { notify, dismissNotification, dismissNotifications } = useNotifications();
    const notifySuccess = useCallback((title: string, message: string) => {
        notify({
            title,
            message,
            status: "success",
        });
    }, []);

    const notifyError = useCallback((title: string, message: string) => {
        notify({
            title,
            message,
            status: "error",
            dismissible: true,
            dismissAfter: 0,
        });
    }, []);

    const notifyLoading = useCallback((title: string, message: string, options?: Partial<Notification>) => {
        let nt = notify({
            title,
            message,
            status: "loading",
            dismissAfter: 0,
            dismissible: false,
            ...options,
        });
        return nt.id;
    }, []);

    const dismissNotify = useCallback((id: string) => dismissNotification(id), []);
    const dismissNotifyAll = useCallback(() => dismissNotifications(), []);

    return {
        /**
         * To show success notification
         * @param title Title of the notification
         * @param message Message of the notification
         */
        notifySuccess,

        /**
         * To show error notification
         * @param title Title of the notification
         * @param message Message of the notification
         */
        notifyError,

        /**
         * To show loading notification with a loading spinner
         * @param title Title of the notification
         * @param message Message of the notification
         * @param options Extra options to pass to the notification
         * @returns id of the notification which can be used to dismiss
         */
        notifyLoading,

        /**
         * To dismiss a notification
         * @param id Id of the notification to dismiss
         */
        dismissNotify,

        /**
         * To dismiss all notifications
         */
        dismissNotifyAll,
    };
};

export default useNotify;
