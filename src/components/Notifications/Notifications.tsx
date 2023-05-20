import React from "react";
import NotificationsSystem, { dismissNotification, baseTheme, atalhoTheme, Notification, Theme } from "reapop";
import NotiCheck from "src/assets/images/noti_check.png";
import NotiCross from "src/assets/images/noti_cross.png";
import styles from "./Notifications.module.css";
import { useAppDispatch, useAppSelector } from "src/state";

interface IProps {}

function getTheme() {
  const bgColor = "#E7F0F7";
  const txtColor = "#012243";
  const customTheme: Theme = {
    ...baseTheme,
    ...atalhoTheme,

    notification: (notification: Notification) => ({
      ...atalhoTheme.notification(notification),
      borderRadius: "12px",
      width: "auto",
      minWidth: "300px",
      backgroundColor: bgColor,
      border: "1px solid #63CCE0",
      boxShadow: "none",
    }),
    // notificationImageContainer: (notification) => ({
    //     ...atalhoTheme.notificationImageContainer(notification),
    //     margin: 0,
    // }),
    notificationMeta: (notification: Notification) => ({
      ...atalhoTheme.notificationMeta(notification),
      verticalAlign: "top",
      padding: "10px 16px",
      paddingBottom: 12,
      paddingLeft: 0,
      width: notification.buttons.length > 0 ? 187 : notification.dismissible ? 200 : 238,
    }),
    notificationTitle: (notification: Notification) => ({
      ...atalhoTheme.notificationMessage(notification),
      margin: notification.message ? "0 0 10px" : 0,
      fontSize: "16px",
      color: txtColor,
      marginBottom: 0,
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    }),
    notificationMessage: (notification: Notification) => ({
      ...atalhoTheme.notificationMessage(notification),
      fontSize: "12px",
      color: txtColor,
      fontFamily: "'Montserrat', sans-serif",
      wordBreak: "break-word",
    }),
    notificationButton: (notification, position, state) => ({
      ...atalhoTheme.notificationButton(notification, position, state),
      background: "transparent",
      borderColor: "#63CCE0",
    }),
    notificationDismissIcon: (notification) => ({
      ...atalhoTheme.notificationDismissIcon(notification),
      background: txtColor,
      color: bgColor,
      padding: 3,
      fontWeight: 200,
      borderRadius: "50%",
      marginTop: "auto",
      marginBottom: "auto",
      marginRight: 20,
    }),
    notificationButtonText: (notification, position, state) => ({
      ...atalhoTheme.notificationButtonText(notification, position, state),
      color: txtColor,
      padding: 0,
      minWidth: 0,
      width: 50,
    }),
  };

  return customTheme;
}

const Notifications: React.FC<IProps> = () => {
  // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
  const dispatch = useAppDispatch();
  // 1. Retrieve the notifications to display.
  const notifications = useAppSelector((state) => state.notifications);

  return (
    <NotificationsSystem
      // 2. Pass the notifications you want Reapop to display.
      notifications={notifications}
      // 3. Pass the function used to dismiss a notification.
      dismissNotification={(id) => dispatch(dismissNotification(id))}
      // 4. Pass a builtIn theme or a custom theme.
      theme={getTheme()}
      components={{
        NotificationIcon,
      }}
    />
  );
};

export default Notifications;

function NotificationIcon({ notification }: { notification: Notification }) {
  let src = "";
  if (notification.status === "success") src = NotiCheck;
  else if (notification.status === "error") src = NotiCross;
  return (
    <div style={{ margin: "auto", marginLeft: 16, marginRight: 16 }}>
      {src ? (
        <img src={src} width={30} height={30} />
      ) : (
        <div
          style={{
            background: "#63CCE0",
            width: 30,
            height: 30,
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.loader} />
        </div>
      )}
    </div>
  );
}
