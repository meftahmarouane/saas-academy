"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Bell, BellOff, BellRing } from "lucide-react";

export function NotificationWidget() {
    const { permission, requestPermission, sendNotification, scheduleReminder } = useNotifications();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Notifications
                </CardTitle>
                {permission === 'granted' ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1"><BellRing className="w-3 h-3" /> On</span>
                ) : (
                    <span className="text-xs text-slate-500 flex items-center gap-1"><BellOff className="w-3 h-3" /> Off</span>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {permission !== 'granted' ? (
                    <div className="text-center py-2">
                        <p className="text-xs text-slate-400 mb-2">Enable notifications to get daily focus reminders.</p>
                        <Button size="sm" onClick={requestPermission} className="w-full">
                            Enable Notifications
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => sendNotification("SaaS Academy", { body: "💰 New customer signed up! +$49 MRR" })}
                        >
                            Test Notification
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => {
                                scheduleReminder("Focus Mode", 0.1);
                                alert("Reminder set for 6 seconds from now");
                            }}
                        >
                            Test Reminder (6s)
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
