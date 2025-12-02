import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface HomeworkScheduleTabProps {
  students: Student[];
  teachers: Teacher[];
  schedule: Schedule[];
  selectedGroup: string;
  homeworkDialogOpen: boolean;
  setHomeworkDialogOpen: (open: boolean) => void;
}

const HomeworkScheduleTab = ({
  students,
  teachers,
  schedule,
  selectedGroup,
  homeworkDialogOpen,
  setHomeworkDialogOpen
}: HomeworkScheduleTabProps) => {
  return {
    homework: (
      <div className="space-y-6">
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
      </div>
    ),
    schedule: (
      <div className="space-y-6">
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
      </div>
    ),
    teachers: (
      <div className="space-y-6">
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
      </div>
    )
  };
};

export default HomeworkScheduleTab;
