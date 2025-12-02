import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Student {
  id: number;
  name: string;
  group: string;
  attendance: { [key: string]: 'present' | 'absent' | 'late' };
  grades: { [subject: string]: { [date: string]: { grade: number; comment?: string; type: 'current' | 'control' | 'final' } } };
  homework: { subject: string; description: string; dueDate: string; files?: string[] }[];
}

interface Teacher {
  id: number;
  name: string;
  subjects: string[];
  load: number;
}

interface Schedule {
  day: string;
  lessons: { time: string; subject: string; room: string; teacher: string }[];
}

const Index = () => {
  const [selectedGroup, setSelectedGroup] = useState('Группа 1');
  const [selectedSubject, setSelectedSubject] = useState('Математика');
  const [selectedDate, setSelectedDate] = useState('01.12');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [homeworkDialogOpen, setHomeworkDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  
  const dates = ['01.12', '02.12', '03.12', '04.12', '05.12'];
  
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Иванов Иван Иванович',
      group: 'Группа 1',
      attendance: {
        '01.12': 'present', '02.12': 'present', '03.12': 'absent', '04.12': 'present', '05.12': 'late'
      },
      grades: {
        'Математика': {
          '01.12': { grade: 5, comment: 'Отлично решил задачи', type: 'current' },
          '02.12': { grade: 4, type: 'current' },
          '03.12': { grade: 5, type: 'control' }
        }
      },
      homework: [
        { subject: 'Математика', description: 'Решить задачи №1-10', dueDate: '03.12', files: ['zadachi.pdf'] },
        { subject: 'Физика', description: 'Параграф 5, вопросы 1-5', dueDate: '04.12' }
      ]
    },
    { 
      id: 2, 
      name: 'Петрова Мария Сергеевна',
      group: 'Группа 1',
      attendance: {
        '01.12': 'present', '02.12': 'late', '03.12': 'present', '04.12': 'present', '05.12': 'present'
      },
      grades: {
        'Математика': {
          '01.12': { grade: 4, type: 'current' },
          '02.12': { grade: 5, type: 'current' },
          '04.12': { grade: 4, type: 'control' }
        }
      },
      homework: [
        { subject: 'Математика', description: 'Решить задачи №1-10', dueDate: '03.12' }
      ]
    },
    { 
      id: 3, 
      name: 'Сидоров Петр Александрович',
      group: 'Группа 1',
      attendance: {
        '01.12': 'absent', '02.12': 'absent', '03.12': 'present', '04.12': 'late', '05.12': 'present'
      },
      grades: {
        'Математика': {
          '01.12': { grade: 3, type: 'current' },
          '03.12': { grade: 3, comment: 'Нужно больше практики', type: 'control' }
        }
      },
      homework: []
    },
    { 
      id: 4, 
      name: 'Козлова Анна Дмитриевна',
      group: 'Группа 1',
      attendance: {
        '01.12': 'present', '02.12': 'present', '03.12': 'present', '04.12': 'present', '05.12': 'present'
      },
      grades: {
        'Математика': {
          '01.12': { grade: 5, type: 'current' },
          '02.12': { grade: 5, type: 'current' },
          '03.12': { grade: 5, type: 'control' }
        }
      },
      homework: []
    },
    { 
      id: 5, 
      name: 'Морозов Алексей Викторович',
      group: 'Группа 1',
      attendance: {
        '01.12': 'present', '02.12': 'absent', '03.12': 'absent', '04.12': 'absent', '05.12': 'late'
      },
      grades: {
        'Математика': {
          '01.12': { grade: 4, type: 'current' }
        }
      },
      homework: []
    }
  ]);

  const [teachers] = useState<Teacher[]>([
    { id: 1, name: 'Смирнов Иван Петрович', subjects: ['Математика', 'Алгебра'], load: 18 },
    { id: 2, name: 'Иванова Мария Сергеевна', subjects: ['Физика'], load: 15 },
    { id: 3, name: 'Петров Алексей Дмитриевич', subjects: ['Химия', 'Биология'], load: 20 }
  ]);

  const [schedule] = useState<Schedule[]>([
    {
      day: 'Понедельник',
      lessons: [
        { time: '09:00', subject: 'Математика', room: '201', teacher: 'Смирнов И.П.' },
        { time: '10:00', subject: 'Физика', room: '305', teacher: 'Иванова М.С.' },
        { time: '11:00', subject: 'Химия', room: '401', teacher: 'Петров А.Д.' }
      ]
    },
    {
      day: 'Вторник',
      lessons: [
        { time: '09:00', subject: 'Алгебра', room: '201', teacher: 'Смирнов И.П.' },
        { time: '10:00', subject: 'Физика', room: '305', teacher: 'Иванова М.С.' }
      ]
    }
  ]);

  const toggleAttendance = (studentId: number, date: string) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        const current = student.attendance[date];
        let next: 'present' | 'absent' | 'late';
        
        if (current === 'present') next = 'absent';
        else if (current === 'absent') next = 'late';
        else next = 'present';
        
        return {
          ...student,
          attendance: { ...student.attendance, [date]: next }
        };
      }
      return student;
    }));
  };

  const getAverageGrade = (student: Student, subject: string): number => {
    const grades = student.grades[subject];
    if (!grades) return 0;
    
    const gradeValues = Object.values(grades).map(g => g.grade);
    if (gradeValues.length === 0) return 0;
    
    const sum = gradeValues.reduce((a, b) => a + b, 0);
    return Math.round((sum / gradeValues.length) * 10) / 10;
  };

  const getAttendanceStats = (student: Student) => {
    const values = Object.values(student.attendance);
    const totalDays = values.length;
    const presentDays = values.filter(v => v === 'present').length;
    const absentDays = values.filter(v => v === 'absent').length;
    const lateDays = values.filter(v => v === 'late').length;
    const attendanceRate = Math.round((presentDays / totalDays) * 100);
    
    return { totalDays, presentDays, absentDays, lateDays, attendanceRate };
  };

  const getOverallStats = () => {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalRecords = 0;

    students.forEach(student => {
      Object.values(student.attendance).forEach(status => {
        totalRecords++;
        if (status === 'present') totalPresent++;
        else if (status === 'absent') totalAbsent++;
        else if (status === 'late') totalLate++;
      });
    });

    return {
      totalPresent,
      totalAbsent,
      totalLate,
      totalRecords,
      attendanceRate: Math.round((totalPresent / totalRecords) * 100)
    };
  };

  const overallStats = getOverallStats();

  const getStatusColor = (status: 'present' | 'absent' | 'late') => {
    if (status === 'present') return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
    if (status === 'absent') return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
    return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'late') => {
    if (status === 'present') return 'Check';
    if (status === 'absent') return 'X';
    return 'Clock';
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 5) return 'bg-green-500 text-white';
    if (grade >= 4) return 'bg-blue-500 text-white';
    if (grade >= 3) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Icon name="GraduationCap" className="text-accent-foreground" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Электронный журнал</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MessageSquare" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="journal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Журнал</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <Icon name="Award" size={16} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="flex items-center gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden sm:inline">Домашние задания</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Преподаватели</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Отчёты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Общая посещаемость</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{overallStats.attendanceRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {overallStats.totalPresent} из {overallStats.totalRecords} занятий
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Присутствовали</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-green-600">{overallStats.totalPresent}</div>
                  <p className="text-xs text-muted-foreground mt-1">записей</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Отсутствовали</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-red-600">{overallStats.totalAbsent}</div>
                  <p className="text-xs text-muted-foreground mt-1">записей</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Опоздали</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-yellow-600">{overallStats.totalLate}</div>
                  <p className="text-xs text-muted-foreground mt-1">записей</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Журнал посещаемости</CardTitle>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Группа 1">Группа 1</SelectItem>
                        <SelectItem value="Группа 2">Группа 2</SelectItem>
                        <SelectItem value="Группа 3">Группа 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Математика">Математика</SelectItem>
                        <SelectItem value="Физика">Физика</SelectItem>
                        <SelectItem value="Химия">Химия</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Студент</TableHead>
                        {dates.map(date => (
                          <TableHead key={date} className="text-center">{date}</TableHead>
                        ))}
                        <TableHead className="text-center">Посещаемость</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(student => {
                        const stats = getAttendanceStats(student);
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            {dates.map(date => (
                              <TableCell key={date} className="text-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`w-12 h-12 rounded-lg ${getStatusColor(student.attendance[date])}`}
                                  onClick={() => toggleAttendance(student.id, date)}
                                >
                                  <Icon name={getStatusIcon(student.attendance[date])} size={18} />
                                </Button>
                              </TableCell>
                            ))}
                            <TableCell className="text-center">
                              <Badge 
                                variant={stats.attendanceRate >= 80 ? "default" : stats.attendanceRate >= 60 ? "secondary" : "destructive"}
                                className="font-semibold"
                              >
                                {stats.attendanceRate}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500/20"></div>
                    <span>Присутствовал</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500/20"></div>
                    <span>Отсутствовал</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-500/20"></div>
                    <span>Опоздал</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Журнал оценок</CardTitle>
                    <CardDescription>Текущие, контрольные и итоговые оценки</CardDescription>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Группа 1">Группа 1</SelectItem>
                        <SelectItem value="Группа 2">Группа 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Математика">Математика</SelectItem>
                        <SelectItem value="Физика">Физика</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Студент</TableHead>
                        {dates.map(date => (
                          <TableHead key={date} className="text-center">{date}</TableHead>
                        ))}
                        <TableHead className="text-center">Средний балл</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map(student => {
                        const avgGrade = getAverageGrade(student, selectedSubject);
                        return (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            {dates.map(date => {
                              const gradeData = student.grades[selectedSubject]?.[date];
                              return (
                                <TableCell key={date} className="text-center">
                                  {gradeData ? (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`w-10 h-10 rounded-lg font-semibold ${getGradeColor(gradeData.grade)}`}
                                        >
                                          {gradeData.grade}
                                          {gradeData.type === 'control' && <span className="text-xs ml-1">К</span>}
                                          {gradeData.type === 'final' && <span className="text-xs ml-1">И</span>}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Оценка</DialogTitle>
                                          <DialogDescription>
                                            {student.name} - {selectedSubject} - {date}
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div>
                                            <Label>Оценка: {gradeData.grade}</Label>
                                            <Badge className="ml-2">
                                              {gradeData.type === 'current' && 'Текущая'}
                                              {gradeData.type === 'control' && 'Контрольная'}
                                              {gradeData.type === 'final' && 'Итоговая'}
                                            </Badge>
                                          </div>
                                          {gradeData.comment && (
                                            <div>
                                              <Label>Комментарий:</Label>
                                              <p className="text-sm text-muted-foreground mt-1">{gradeData.comment}</p>
                                            </div>
                                          )}
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-10 h-10 rounded-lg"
                                      onClick={() => {
                                        setSelectedStudent(student.id);
                                        setSelectedDate(date);
                                        setGradeDialogOpen(true);
                                      }}
                                    >
                                      <Icon name="Plus" size={16} />
                                    </Button>
                                  )}
                                </TableCell>
                              );
                            })}
                            <TableCell className="text-center">
                              <Badge variant={avgGrade >= 4.5 ? "default" : avgGrade >= 3.5 ? "secondary" : "destructive"} className="font-semibold">
                                {avgGrade > 0 ? avgGrade : '-'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Домашние задания</CardTitle>
                    <CardDescription>Управление индивидуальными и групповыми заданиями</CardDescription>
                  </div>
                  <Dialog open={homeworkDialogOpen} onOpenChange={setHomeworkDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить задание
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новое домашнее задание</DialogTitle>
                        <DialogDescription>Создайте индивидуальное или групповое задание</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Предмет</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите предмет" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="math">Математика</SelectItem>
                              <SelectItem value="physics">Физика</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Описание</Label>
                          <Textarea placeholder="Опишите задание" />
                        </div>
                        <div>
                          <Label>Срок сдачи</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label>Прикрепить файлы</Label>
                          <Input type="file" multiple />
                        </div>
                        <Button className="w-full">Создать задание</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.slice(0, 3).map(student => (
                    <Card key={student.id}>
                      <CardHeader>
                        <CardTitle className="text-base">{student.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.homework.length > 0 ? (
                          <div className="space-y-2">
                            {student.homework.map((hw, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Icon name="FileText" size={20} className="text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">{hw.subject}</p>
                                    <p className="text-sm text-muted-foreground">{hw.description}</p>
                                  </div>
                                </div>
                                <Badge variant="outline">До {hw.dueDate}</Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Нет активных заданий</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Расписание занятий</CardTitle>
                <CardDescription>Актуальное расписание для {selectedGroup}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {schedule.map((day, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold mb-3">{day.day}</h3>
                      <div className="space-y-2">
                        {day.lessons.map((lesson, lessonIdx) => (
                          <div key={lessonIdx} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="w-16 justify-center">{lesson.time}</Badge>
                              <div>
                                <p className="font-medium">{lesson.subject}</p>
                                <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                              </div>
                            </div>
                            <Badge variant="secondary">Каб. {lesson.room}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Преподаватели</CardTitle>
                <CardDescription>Список преподавателей и их нагрузка</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ФИО</TableHead>
                        <TableHead>Предметы</TableHead>
                        <TableHead className="text-center">Нагрузка (часов/нед)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map(teacher => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">{teacher.name}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {teacher.subjects.map((subject, idx) => (
                                <Badge key={idx} variant="secondary">{subject}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={teacher.load > 18 ? "destructive" : "default"}>
                              {teacher.load} ч
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Отчёт по успеваемости</CardTitle>
                  <CardDescription>Анализ успеваемости студентов</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать Excel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отчёт по посещаемости</CardTitle>
                  <CardDescription>Статистика посещений</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отчёт по нагрузке</CardTitle>
                  <CardDescription>Распределение нагрузки учителей</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать Excel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Сводный отчёт</CardTitle>
                  <CardDescription>Общая статистика за период</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
