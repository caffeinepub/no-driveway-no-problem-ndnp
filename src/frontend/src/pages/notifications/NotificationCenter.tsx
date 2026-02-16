import { useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import {
  useGetCallerNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '../../hooks/useNotifications';
import PageLayout from '../../components/layout/PageLayout';
import { PageTitle } from '../../components/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Calendar, DollarSign, AlertTriangle, UserX, Loader2 } from 'lucide-react';
import { NotificationType } from '../../lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function NotificationCenter() {
  const { identity, login } = useInternetIdentity();
  const { data: notifications, isLoading } = useGetCallerNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!identity) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Notification Center</PageTitle>
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Please sign in to view notifications</p>
              <Button onClick={login}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  const filteredNotifications = (notifications || []).filter((n) =>
    filter === 'unread' ? !n.read : true
  );

  const unreadCount = (notifications || []).filter((n) => !n.read).length;

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

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleMarkAsRead = async (notificationId: bigint) => {
    try {
      await markAsRead.mutateAsync(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead.mutateAsync();
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="space-y-6">
          <PageTitle>Notification Center</PageTitle>
          <Card>
            <CardContent className="py-12 space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <PageTitle>Notification Center</PageTitle>
            <p className="text-muted-foreground mt-2">
              {unreadCount > 0 ? `${unreadCount} unread notification(s)` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllAsRead}
              disabled={markAllAsRead.isPending}
            >
              {markAllAsRead.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Marking...
                </>
              ) : (
                'Mark All as Read'
              )}
            </Button>
          )}
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {filter === 'all' ? 'All Notifications' : 'Unread Notifications'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredNotifications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {filteredNotifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <div
                          key={notification.id.toString()}
                          className={`flex gap-4 p-4 border rounded-lg ${
                            notification.read ? 'bg-background' : 'bg-muted/50'
                          }`}
                        >
                          <div className="mt-1">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p
                              className={`${
                                notification.read ? 'text-muted-foreground' : 'font-medium'
                              }`}
                            >
                              {getNotificationText(notification.type, notification.referenceId)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              disabled={markAsRead.isPending}
                            >
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
