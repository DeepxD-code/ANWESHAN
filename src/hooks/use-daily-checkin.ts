import { useState, useEffect, useCallback } from "react";
import API_BASE from "@/lib/api";

export interface CheckInReminder {
  id: string;
  title: string;
  scheduledTime: string; // HH:mm format
  frequency: "daily" | "weekly" | "once";
  isCompleted: boolean;
  completedAt?: string;
  nextReminderAt?: string;
}

const CHECKIN_STORAGE_KEY = "anweshan_checkin_reminders";

export const useDailyCheckIn = () => {
  const [reminders, setReminders] = useState<CheckInReminder[]>([]);
  const [nextReminder, setNextReminder] = useState<CheckInReminder | null>(null);

  // Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CHECKIN_STORAGE_KEY);
    if (stored) {
      try {
        setReminders(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load check-in reminders:", e);
      }
    } else {
      // Initialize default reminders
      const defaultReminders: CheckInReminder[] = [
        {
          id: "checkin-morning",
          title: "Morning Wellness Check",
          scheduledTime: "08:00",
          frequency: "daily",
          isCompleted: false,
        },
        {
          id: "checkin-evening",
          title: "Evening Health Review",
          scheduledTime: "18:00",
          frequency: "daily",
          isCompleted: false,
        },
      ];
      setReminders(defaultReminders);
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(defaultReminders));
    }
  }, []);

  // Check for due reminders
  useEffect(() => {
    const checkForDueReminders = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const due = reminders.find((reminder) => {
        if (reminder.isCompleted) return false;
        if (reminder.scheduledTime === currentTime) {
          return true;
        }
        return false;
      });

      setNextReminder(due || null);
    };

    checkForDueReminders();
    const interval = setInterval(checkForDueReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = useCallback(
    (title: string, scheduledTime: string, frequency: "daily" | "weekly" | "once" = "daily") => {
      const newReminder: CheckInReminder = {
        id: `checkin-${Date.now()}`,
        title,
        scheduledTime,
        frequency,
        isCompleted: false,
      };
      const updated = [...reminders, newReminder];
      setReminders(updated);
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(updated));
    },
    [reminders]
  );

  const completeReminder = useCallback(
    (reminderId: string) => {
      const updated = reminders.map((r) => {
        if (r.id === reminderId) {
          const completed = {
            ...r,
            isCompleted: true,
            completedAt: new Date().toISOString(),
          };
          // Reset daily reminders tomorrow
          if (r.frequency === "daily") {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            return {
              ...completed,
              isCompleted: false,
              nextReminderAt: nextDay.toISOString(),
            };
          }
          return completed;
        }
        return r;
      });
      setReminders(updated);
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(updated));
      
      // Send alert to family
      sendCheckInAlert(reminderId);
    },
    [reminders]
  );

  const skipReminder = useCallback(
    (reminderId: string) => {
      const updated = reminders.map((r) => {
        if (r.id === reminderId) {
          return { ...r, isCompleted: true };
        }
        return r;
      });
      setReminders(updated);
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(updated));
    },
    [reminders]
  );

  const removeReminder = useCallback(
    (reminderId: string) => {
      const updated = reminders.filter((r) => r.id !== reminderId);
      setReminders(updated);
      localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(updated));
    },
    [reminders]
  );

  return {
    reminders,
    nextReminder,
    addReminder,
    completeReminder,
    skipReminder,
    removeReminder,
  };
};

// Send check-in completion alert to family/guardians
const sendCheckInAlert = async (reminderId: string) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const reminderTitle = reminderId.split("-")[1] || "Daily Check-In";

    if (!user.id) return;

    await fetch(`${API_BASE}/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "checkin",
        seniorId: user.id,
        location: "Senior completed daily check-in",
        severity: "low",
        conversation: `Wellness check-in completed: ${reminderTitle} at ${new Date().toLocaleTimeString()}`,
      }),
    });
  } catch (err) {
    console.error("Failed to send check-in alert:", err);
  }
};
