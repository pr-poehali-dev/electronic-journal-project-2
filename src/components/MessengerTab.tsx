import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: 'teacher' | 'student' | 'parent';
  text: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: number;
  name: string;
  role: 'teacher' | 'student' | 'parent' | 'group';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const MessengerTab = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      role: 'student',
      lastMessage: 'Здравствуйте, можно задать вопрос?',
      lastMessageTime: '14:30',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'Родитель Петровой М.',
      role: 'parent',
      lastMessage: 'Спасибо за информацию',
      lastMessageTime: '12:15',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      name: 'Группа 1 - Математика',
      role: 'group',
      lastMessage: 'Задание на завтра: стр. 45-48',
      lastMessageTime: '10:00',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 4,
      name: 'Смирнов И.П. (Учитель)',
      role: 'teacher',
      lastMessage: 'Передайте материалы',
      lastMessageTime: 'вчера',
      unreadCount: 1,
      isOnline: true
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      senderName: 'Иванов Иван',
      senderRole: 'student',
      text: 'Здравствуйте! Можно задать вопрос по домашнему заданию?',
      timestamp: '14:25',
      isRead: true
    },
    {
      id: 2,
      senderId: 0,
      senderName: 'Вы',
      senderRole: 'teacher',
      text: 'Здравствуйте, Иван! Конечно, задавайте.',
      timestamp: '14:27',
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Иванов Иван',
      senderRole: 'student',
      text: 'Не могу понять задачу №5. Можете подсказать с чего начать?',
      timestamp: '14:30',
      isRead: false
    }
  ]);

  const getRoleColor = (role: 'teacher' | 'student' | 'parent' | 'group') => {
    if (role === 'teacher') return 'bg-blue-500';
    if (role === 'student') return 'bg-green-500';
    if (role === 'parent') return 'bg-purple-500';
    return 'bg-orange-500';
  };

  const getRoleIcon = (role: 'teacher' | 'student' | 'parent' | 'group') => {
    if (role === 'teacher') return 'GraduationCap';
    if (role === 'student') return 'User';
    if (role === 'parent') return 'Users';
    return 'MessageSquare';
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Защищённый мессенджер</CardTitle>
              <CardDescription>Общение с учениками, родителями и коллегами</CardDescription>
            </div>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Новый чат
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            <div className="lg:col-span-1 border rounded-lg">
              <div className="p-4 border-b">
                <Input placeholder="Поиск контактов..." />
              </div>
              <ScrollArea className="h-[540px]">
                <div className="space-y-1 p-2">
                  {chats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === chat.id ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className={`${getRoleColor(chat.role)}`}>
                            <AvatarFallback className="text-white">
                              <Icon name={getRoleIcon(chat.role)} size={20} />
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm truncate">{chat.name}</p>
                            <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="lg:col-span-2 border rounded-lg flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className={getRoleColor(chats.find(c => c.id === selectedChat)?.role || 'student')}>
                        <AvatarFallback className="text-white">
                          <Icon name={getRoleIcon(chats.find(c => c.id === selectedChat)?.role || 'student')} size={20} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{chats.find(c => c.id === selectedChat)?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {chats.find(c => c.id === selectedChat)?.isOnline ? 'В сети' : 'Не в сети'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Phone" size={20} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Video" size={20} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === 0
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {message.senderId !== 0 && (
                              <p className="text-xs font-medium mb-1">{message.senderName}</p>
                            )}
                            <p className="text-sm">{message.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                              {message.senderId === 0 && (
                                <Icon
                                  name={message.isRead ? 'CheckCheck' : 'Check'}
                                  size={14}
                                  className={message.isRead ? 'text-blue-500' : 'text-muted-foreground'}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Paperclip" size={20} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="Smile" size={20} />
                      </Button>
                      <Input
                        placeholder="Введите сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Выберите чат для начала общения
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessengerTab;
