import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetCallerNotifications,
  useGetCallerUnreadNotificationCount,
  useMarkNotificationAsRead,
} from '../../hooks/useNotifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, DollarSign, AlertTriangle, UserX } from 'lucide-react';
import { NotificationType } from '../../lib/types';

export default function NotificationDropdown() {
  const navigate = useNavigate();
  const { data: notifications } = useGetCallerNotifications();
  const { data: unreadCount } = useGetCallerUnreadNotificationCount();
  const markAsRead = useMarkNotificationAsRead();
  const [open, setOpen] = useState(false);

  const recentNotifications = (notifications || []).slice(0, 5);
  const unreadCountNum = Number(unreadCount || BigInt(0));

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.bookingCreated:
      case NotificationType.bookingConfirmed:
        return Calendar;
      case NotificationType.fundsReleased:
        return DollarSign;
      case NotificationType.disputeOpened:
        return AlertTriangle;
      case NotificationType.accountSuspended:
        return UserX;
      default:
        return Bell;
    }
  };

  const getNotificationText = (type: NotificationType, referenceId: bigint) => {
    switch (type) {
      case NotificationType.bookingCreated:
        return `New booking created #${referenceId.toString()}`;
      case NotificationType.bookingConfirmed:
        return `Booking confirmed #${referenceId.toString()}`;
      case NotificationType.fundsReleased:
        return `Funds released for booking #${referenceId.toString()}`;
      case NotificationType.disputeOpened:
        return `Dispute opened for booking #${referenceId.toString()}`;
      case NotificationType.accountSuspended:
        return 'Your account has been suspended';
      default:
        return 'New notification';
    }
  };

  const handleNotificationClick = async (notificationId: bigint, read: boolean) => {
    if (!read) {
      try {
        await markAsRead.mutateAsync(notificationId);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
    setOpen(false);
    navigate({ to: '/notifications' });
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCountNum > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCountNum > 9 ? '9+' : unreadCountNum}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recentNotifications.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <>
            {recentNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <DropdownMenuItem
                  key={notification.id.toString()}
                  className="cursor-pointer"
                  onClick={() =>
                    handleNotificationClick(notification.id, notification.read)
                  }
                >
                  <div className="flex gap-3 w-full">
                    <div className="mt-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p
                        className={`text-sm ${
                          notification.read ? 'text-muted-foreground' : 'font-medium'
                        }`}
                      >
                        {getNotificationText(notification.type, notification.referenceId)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="mt-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer justify-center"
              onClick={() => {
                setOpen(false);
                navigate({ to: '/notifications' });
              }}
            >
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
