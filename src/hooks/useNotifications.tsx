"use client";

import { useEffect, useState } from "react";

export function useNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            const perm = await Notification.requestPermission();
            setPermission(perm);
            return perm;
        }
        return 'denied';
    };

    const sendNotification = (title: string, options?: NotificationOptions) => {
        if (permission === 'granted') {
            new Notification(title, {
                icon: '/icon.png', // We should add an icon eventually
                badge: '/icon.png',
                ...options
            });
        } else if (permission === 'default') {
            requestPermission().then(perm => {
                if (perm === 'granted') {
                    sendNotification(title, options);
                }
            })
        }
    };

    const scheduleReminder = (title: string, minutes: number) => {
        setTimeout(() => {
            sendNotification(title, { body: "Time to focus on your SaaS!" });
        }, minutes * 60 * 1000);
    }

    return { permission, requestPermission, sendNotification, scheduleReminder };
}
