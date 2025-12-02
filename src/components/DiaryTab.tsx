import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const DiaryTab = () => {
  const [selectedStudent, setSelectedStudent] = useState('Иванов И.И.');

  const students = [
    'Иванов Иван Иванович',
    'Петрова Мария Сергеевна',
    'Сидоров Петр Александрович',
    'Козлова Анна Дмитриевна'
  ];

  const schedule = [
    { time: '09:00', subject: 'Математика', room: '201', teacher: 'Смирнов И.П.', homework: 'Задачи №1-10', topic: 'Квадратные уравнения' },
    { time: '10:00', subject: 'Физика', room: '305', teacher: 'Иванова М.С.', homework: 'Параграф 5, вопросы 1-5', topic: 'Законы Ньютона' },
    { time: '11:00', subject: 'Химия', room: '401', teacher: 'Петров А.Д.', homework: 'Лабораторная работа №3', topic: 'Химические реакции' },
    { time: '12:00', subject: 'История', room: '105', teacher: 'Волкова Е.А.', homework: 'Эссе на тему', topic: 'Великая Отечественная война' }
  ];

  const grades = [
    { date: '01.12', subject: 'Математика', grade: 5, type: 'current', comment: 'Отлично решил задачи' },
    { date: '01.12', subject: 'Физика', grade: 4, type: 'current', comment: '' },
    { date: '02.12', subject: 'Математика', grade: 4, type: 'current', comment: '' },
    { date: '02.12', subject: 'Химия', grade: 5, type: 'control', comment: 'Отличная контрольная работа' },
    { date: '03.12', subject: 'История', grade: 5, type: 'current', comment: '' }
  ];

  const homework = [
    {
      subject: 'Математика',
      description: 'Решить задачи №1-10 из учебника',
      dueDate: '03.12.2024',
      status: 'pending',
      files: ['zadachi.pdf']
    },
    {
      subject: 'Физика',
      description: 'Параграф 5, ответить на вопросы 1-5',
      dueDate: '04.12.2024',
      status: 'pending',
      files: []
    },
    {
      subject: 'Химия',
      description: 'Лабораторная работа №3 - оформить отчет',
      dueDate: '05.12.2024',
      status: 'completed',
      files: ['lab3.docx']
    }
  ];

  const remarks = [
    { date: '01.12', type: 'remark', text: 'Опоздание на урок', teacher: 'Смирнов И.П.' },
    { date: '29.11', type: 'praise', text: 'Активное участие в дискуссии', teacher: 'Волкова Е.А.' },
    { date: '28.11', type: 'praise', text: 'Помощь одноклассникам', teacher: 'Иванова М.С.' }
  ];

  const avgBySubject = [
    { subject: 'Математика', avg: 4.5, trend: 'up' },
    { subject: 'Физика', avg: 4.0, trend: 'same' },
    { subject: 'Химия', avg: 4.8, trend: 'up' },
    { subject: 'История', avg: 4.3, trend: 'down' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Электронный дневник</h2>
          <p className="text-sm text-muted-foreground">Для учеников и родителей</p>
        </div>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-[280px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {students.map((student, idx) => (
              <SelectItem key={idx} value={student}>{student}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schedule">Расписание</TabsTrigger>
          <TabsTrigger value="grades">Оценки</TabsTrigger>
          <TabsTrigger value="homework">Домашние задания</TabsTrigger>
          <TabsTrigger value="remarks">Замечания</TabsTrigger>
          <TabsTrigger value="progress">Прогресс</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Расписание на сегодня</CardTitle>
              <CardDescription>2 декабря 2024, Понедельник</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule.map((lesson, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">{lesson.time}</Badge>
                          <h3 className="font-semibold">{lesson.subject}</h3>
                          <Badge variant="secondary">Каб. {lesson.room}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <Icon name="User" size={14} className="inline mr-1" />
                          {lesson.teacher}
                        </p>
                        <p className="text-sm font-medium mb-1">
                          <Icon name="BookOpen" size={14} className="inline mr-1" />
                          Тема: {lesson.topic}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Icon name="FileText" size={14} className="inline mr-1" />
                          ДЗ: {lesson.homework}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>История оценок</CardTitle>
              <CardDescription>Все оценки с комментариями учителей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Предмет</TableHead>
                      <TableHead className="text-center">Оценка</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Комментарий</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((grade, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{grade.date}</TableCell>
                        <TableCell className="font-medium">{grade.subject}</TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={grade.grade >= 5 ? "default" : grade.grade >= 4 ? "secondary" : "destructive"}
                            className="font-semibold"
                          >
                            {grade.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={grade.type === 'control' ? "default" : "outline"}>
                            {grade.type === 'current' ? 'Текущая' : grade.type === 'control' ? 'Контрольная' : 'Итоговая'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {grade.comment || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homework">
          <Card>
            <CardHeader>
              <CardTitle>Домашние задания</CardTitle>
              <CardDescription>Активные и выполненные задания</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {homework.map((hw, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 ${
                      hw.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{hw.subject}</h3>
                          <Badge variant={hw.status === 'completed' ? "default" : "secondary"}>
                            {hw.status === 'completed' ? 'Выполнено' : 'В процессе'}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{hw.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            Срок: {hw.dueDate}
                          </span>
                          {hw.files.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Icon name="Paperclip" size={14} />
                              {hw.files.length} файл(ов)
                            </span>
                          )}
                        </div>
                      </div>
                      {hw.status === 'pending' && (
                        <Button size="sm">
                          <Icon name="Upload" size={16} className="mr-2" />
                          Сдать
                        </Button>
                      )}
                    </div>
                    {hw.files.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {hw.files.map((file, fileIdx) => (
                          <Badge key={fileIdx} variant="outline" className="cursor-pointer">
                            <Icon name="File" size={12} className="mr-1" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remarks">
          <Card>
            <CardHeader>
              <CardTitle>Замечания и поощрения</CardTitle>
              <CardDescription>От учителей</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {remarks.map((remark, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 ${
                      remark.type === 'praise'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          remark.type === 'praise' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        <Icon
                          name={remark.type === 'praise' ? 'ThumbsUp' : 'AlertCircle'}
                          size={20}
                          className="text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={remark.type === 'praise' ? "default" : "destructive"}>
                            {remark.type === 'praise' ? 'Поощрение' : 'Замечание'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{remark.date}</span>
                        </div>
                        <p className="font-medium mb-1">{remark.text}</p>
                        <p className="text-sm text-muted-foreground">
                          <Icon name="User" size={12} className="inline mr-1" />
                          {remark.teacher}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Средний балл по предметам</CardTitle>
                <CardDescription>Анализ успеваемости</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {avgBySubject.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.subject}</span>
                          {item.trend === 'up' && (
                            <Icon name="TrendingUp" size={16} className="text-green-500" />
                          )}
                          {item.trend === 'down' && (
                            <Icon name="TrendingDown" size={16} className="text-red-500" />
                          )}
                        </div>
                        <Badge variant={item.avg >= 4.5 ? "default" : item.avg >= 4 ? "secondary" : "destructive"}>
                          {item.avg}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Органайзер</CardTitle>
                <CardDescription>Важные события и дедлайны</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Icon name="Calendar" size={20} className="text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium">Контрольная работа</p>
                      <p className="text-sm text-muted-foreground">Математика - 05.12.2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Icon name="FileText" size={20} className="text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium">Сдача проекта</p>
                      <p className="text-sm text-muted-foreground">История - 08.12.2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <Icon name="Users" size={20} className="text-green-500 mt-1" />
                    <div>
                      <p className="font-medium">Родительское собрание</p>
                      <p className="text-sm text-muted-foreground">10.12.2024, 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiaryTab;
