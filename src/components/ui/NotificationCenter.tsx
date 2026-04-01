import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Check, Trash2, Mail, Star, Zap, Calendar, Award, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markOneRead,
  clearAll,
  subscribeNotifications,
  type AppNotification,
} from "@/src/lib/notifications";

const iconMap: Record<AppNotification["type"], React.ReactNode> = {
  invitation: <Mail className="h-4 w-4 text-primary" />,
  reply: <Mail className="h-4 w-4 text-emerald-400" />,
  shortlisted: <Star className="h-4 w-4 text-amber-400" />,
  application: <Zap className="h-4 w-4 text-blue-400" />,
  audition_new: <Calendar className="h-4 w-4 text-primary" />,
  callback: <Award className="h-4 w-4 text-emerald-400" />,
  offer: <Award className="h-4 w-4 text-amber-400" />,
};

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<AppNotification[]>(
    () => getNotifications()
  );
  const [unread, setUnread] = React.useState(() => getUnreadCount());
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    return subscribeNotifications(() => {
      setNotifications(getNotifications());
      setUnread(getUnreadCount());
    });
  }, []);

  // close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setOpen((v) => !v);
  };

  const handleMarkAllRead = () => {
    markAllRead();
    setNotifications(getNotifications());
    setUnread(0);
  };

  const handleClear = () => {
    clearAll();
    setNotifications([]);
    setUnread(0);
  };

  const handleClickItem = (n: AppNotification) => {
    markOneRead(n.id);
    setNotifications(getNotifications());
    setUnread(getUnreadCount());
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-80 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <span className="text-sm font-bold text-white">Notifications</span>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
              {notifications.length === 0 ? (
                <div className="py-10 text-center text-white/30 text-sm">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleClickItem(n)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors",
                      !n.read && "bg-primary/5"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {iconMap[n.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold", !n.read ? "text-white" : "text-white/60")}>
                        {n.title}
                      </p>
                      <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">{n.body}</p>
                      <p className="text-[10px] text-white/20 mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
