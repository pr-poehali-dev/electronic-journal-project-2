import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface LessonType {
  id: string;
  name: string;
  weight: number;
  color: string;
}

interface Lesson {
  id: string;
  date: string;
  topic: string;
  typeId: string;
}

interface Grade {
  lessonId: string;
  studentId: number;
  value: number | 'Зачет' | 'Н/А';
}

interface Period {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'quarter' | 'exam' | 'final';
}

interface FinalGrade {
  studentId: number;
  periodId: string;
  value: number | 'Зачет' | 'Н/А';
}

interface Student {
  id: number;
  name: string;
}

const LessonsTab = () => {
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>([
    { id: '1', name: 'Текущая', weight: 1, color: 'bg-blue-500' },
    { id: '2', name: 'Самостоятельная', weight: 2, color: 'bg-green-500' },
    { id: '3', name: 'Контрольная', weight: 3, color: 'bg-orange-500' },
    { id: '4', name: 'Практическая', weight: 2, color: 'bg-purple-500' },
  ]);

  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', date: '2024-12-01', topic: 'Линейные уравнения', typeId: '1' },
    { id: '2', date: '2024-12-03', topic: 'Системы уравнений', typeId: '1' },
    { id: '3', date: '2024-12-05', topic: 'Самостоятельная работа', typeId: '2' },
    { id: '4', date: '2024-12-08', topic: 'Квадратные уравнения', typeId: '1' },
    { id: '5', date: '2024-12-10', topic: 'Контрольная работа №1', typeId: '3' },
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    { lessonId: '1', studentId: 1, value: 5 },
    { lessonId: '1', studentId: 2, value: 4 },
    { lessonId: '2', studentId: 1, value: 4 },
    { lessonId: '3', studentId: 1, value: 5 },
    { lessonId: '3', studentId: 2, value: 4 },
    { lessonId: '5', studentId: 1, value: 5 },
  ]);

  const [periods, setPeriods] = useState<Period[]>([
    { id: '1', name: '1 четверть', startDate: '2024-09-01', endDate: '2024-10-31', type: 'quarter' },
    { id: '2', name: '2 четверть', startDate: '2024-11-01', endDate: '2024-12-31', type: 'quarter' },
    { id: '3', name: '3 четверть', startDate: '2025-01-10', endDate: '2025-03-20', type: 'quarter' },
    { id: '4', name: '4 четверть', startDate: '2025-03-31', endDate: '2025-05-31', type: 'quarter' },
    { id: '5', name: 'Экзамен', startDate: '2025-06-01', endDate: '2025-06-15', type: 'exam' },
    { id: '6', name: 'Итоговая', startDate: '2024-09-01', endDate: '2025-06-15', type: 'final' },
  ]);

  const [finalGrades, setFinalGrades] = useState<FinalGrade[]>([
    { studentId: 1, periodId: '1', value: 5 },
    { studentId: 2, periodId: '1', value: 4 },
  ]);

  const students: Student[] = [
    { id: 1, name: 'Иванов Иван Иванович' },
    { id: 2, name: 'Петрова Мария Сергеевна' },
    { id: 3, name: 'Сидоров Петр Александрович' },
  ];

  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [periodDialogOpen, setPeriodDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<LessonType | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingPeriod, setEditingPeriod] = useState<Period | null>(null);

  const calculateAverage = (studentId: number, periodId?: string) => {
    let relevantLessons = lessons;
    
    if (periodId) {
      const period = periods.find(p => p.id === periodId);
      if (period) {
        relevantLessons = lessons.filter(l => {
          const lessonDate = new Date(l.date);
          return lessonDate >= new Date(period.startDate) && lessonDate <= new Date(period.endDate);
        });
      }
    }

    const studentGrades = grades.filter(g => 
      g.studentId === studentId && 
      relevantLessons.find(l => l.id === g.lessonId) &&
      typeof g.value === 'number'
    );

    if (studentGrades.length === 0) return '-';

    const sum = studentGrades.reduce((acc, g) => acc + (g.value as number), 0);
    return (sum / studentGrades.length).toFixed(2);
  };

  const calculateWeightedAverage = (studentId: number, periodId?: string) => {
    let relevantLessons = lessons;
    
    if (periodId) {
      const period = periods.find(p => p.id === periodId);
      if (period) {
        relevantLessons = lessons.filter(l => {
          const lessonDate = new Date(l.date);
          return lessonDate >= new Date(period.startDate) && lessonDate <= new Date(period.endDate);
        });
      }
    }

    const studentGrades = grades.filter(g => 
      g.studentId === studentId && 
      relevantLessons.find(l => l.id === g.lessonId) &&
      typeof g.value === 'number'
    );

    if (studentGrades.length === 0) return '-';

    let weightedSum = 0;
    let totalWeight = 0;

    studentGrades.forEach(g => {
      const lesson = lessons.find(l => l.id === g.lessonId);
      if (lesson) {
        const type = lessonTypes.find(t => t.id === lesson.typeId);
        if (type) {
          weightedSum += (g.value as number) * type.weight;
          totalWeight += type.weight;
        }
      }
    });

    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : '-';
  };

  const addLessonType = (name: string, weight: number, color: string) => {
    const newType: LessonType = {
      id: Date.now().toString(),
      name,
      weight,
      color
    };
    setLessonTypes([...lessonTypes, newType]);
  };

  const updateLessonType = (id: string, name: string, weight: number, color: string) => {
    setLessonTypes(lessonTypes.map(t => 
      t.id === id ? { ...t, name, weight, color } : t
    ));
  };

  const deleteLessonType = (id: string) => {
    setLessonTypes(lessonTypes.filter(t => t.id !== id));
  };

  const addLesson = (date: string, topic: string, typeId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      date,
      topic,
      typeId
    };
    setLessons([...lessons, newLesson]);
  };

  const updateLesson = (id: string, date: string, topic: string, typeId: string) => {
    setLessons(lessons.map(l => 
      l.id === id ? { ...l, date, topic, typeId } : l
    ));
  };

  const deleteLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
    setGrades(grades.filter(g => g.lessonId !== id));
  };

  const addPeriod = (name: string, startDate: string, endDate: string, type: 'quarter' | 'exam' | 'final') => {
    const newPeriod: Period = {
      id: Date.now().toString(),
      name,
      startDate,
      endDate,
      type
    };
    setPeriods([...periods, newPeriod]);
  };

  const updatePeriod = (id: string, name: string, startDate: string, endDate: string, type: 'quarter' | 'exam' | 'final') => {
    setPeriods(periods.map(p => 
      p.id === id ? { ...p, name, startDate, endDate, type } : p
    ));
  };

  const deletePeriod = (id: string) => {
    setPeriods(periods.filter(p => p.id !== id));
    setFinalGrades(finalGrades.filter(g => g.periodId !== id));
  };

  const updateGrade = (lessonId: string, studentId: number, value: number | 'Зачет' | 'Н/А' | null) => {
    if (value === null) {
      setGrades(grades.filter(g => !(g.lessonId === lessonId && g.studentId === studentId)));
    } else {
      const existing = grades.find(g => g.lessonId === lessonId && g.studentId === studentId);
      if (existing) {
        setGrades(grades.map(g => 
          g.lessonId === lessonId && g.studentId === studentId ? { ...g, value } : g
        ));
      } else {
        setGrades([...grades, { lessonId, studentId, value }]);
      }
    }
  };

  const updateFinalGrade = (studentId: number, periodId: string, value: number | 'Зачет' | 'Н/А' | null) => {
    if (value === null) {
      setFinalGrades(finalGrades.filter(g => !(g.studentId === studentId && g.periodId === periodId)));
    } else {
      const existing = finalGrades.find(g => g.studentId === studentId && g.periodId === periodId);
      if (existing) {
        setFinalGrades(finalGrades.map(g => 
          g.studentId === studentId && g.periodId === periodId ? { ...g, value } : g
        ));
      } else {
        setFinalGrades([...finalGrades, { studentId, periodId, value }]);
      }
    }
  };

  const TypeDialog = () => {
    const [name, setName] = useState(editingType?.name || '');
    const [weight, setWeight] = useState(editingType?.weight.toString() || '1');
    const [color, setColor] = useState(editingType?.color || 'bg-blue-500');

    const handleSubmit = () => {
      if (editingType) {
        updateLessonType(editingType.id, name, parseFloat(weight), color);
      } else {
        addLessonType(name, parseFloat(weight), color);
      }
      setTypeDialogOpen(false);
      setEditingType(null);
    };

    return (
      <Dialog open={typeDialogOpen} onOpenChange={(open) => {
        setTypeDialogOpen(open);
        if (!open) setEditingType(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingType ? 'Редактировать тип урока' : 'Добавить тип урока'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Контрольная" />
            </div>
            <div>
              <Label>Вес (коэффициент)</Label>
              <Input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <Label>Цвет</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-blue-500">Синий</SelectItem>
                  <SelectItem value="bg-green-500">Зелёный</SelectItem>
                  <SelectItem value="bg-orange-500">Оранжевый</SelectItem>
                  <SelectItem value="bg-purple-500">Фиолетовый</SelectItem>
                  <SelectItem value="bg-red-500">Красный</SelectItem>
                  <SelectItem value="bg-yellow-500">Жёлтый</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingType ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const LessonDialog = () => {
    const [date, setDate] = useState(editingLesson?.date || '');
    const [topic, setTopic] = useState(editingLesson?.topic || '');
    const [typeId, setTypeId] = useState(editingLesson?.typeId || lessonTypes[0]?.id || '');

    const handleSubmit = () => {
      if (editingLesson) {
        updateLesson(editingLesson.id, date, topic, typeId);
      } else {
        addLesson(date, topic, typeId);
      }
      setLessonDialogOpen(false);
      setEditingLesson(null);
    };

    return (
      <Dialog open={lessonDialogOpen} onOpenChange={(open) => {
        setLessonDialogOpen(open);
        if (!open) setEditingLesson(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLesson ? 'Редактировать урок' : 'Добавить урок'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Дата</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>Тема урока</Label>
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Линейные уравнения" />
            </div>
            <div>
              <Label>Тип урока</Label>
              <Select value={typeId} onValueChange={setTypeId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lessonTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingLesson ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const PeriodDialog = () => {
    const [name, setName] = useState(editingPeriod?.name || '');
    const [startDate, setStartDate] = useState(editingPeriod?.startDate || '');
    const [endDate, setEndDate] = useState(editingPeriod?.endDate || '');
    const [type, setType] = useState<'quarter' | 'exam' | 'final'>(editingPeriod?.type || 'quarter');

    const handleSubmit = () => {
      if (editingPeriod) {
        updatePeriod(editingPeriod.id, name, startDate, endDate, type);
      } else {
        addPeriod(name, startDate, endDate, type);
      }
      setPeriodDialogOpen(false);
      setEditingPeriod(null);
    };

    return (
      <Dialog open={periodDialogOpen} onOpenChange={(open) => {
        setPeriodDialogOpen(open);
        if (!open) setEditingPeriod(null);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPeriod ? 'Редактировать период' : 'Добавить период'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="1 четверть" />
            </div>
            <div>
              <Label>Тип периода</Label>
              <Select value={type} onValueChange={(v) => setType(v as 'quarter' | 'exam' | 'final')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quarter">Четверть</SelectItem>
                  <SelectItem value="exam">Экзамен</SelectItem>
                  <SelectItem value="final">Итоговая</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дата начала</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <Label>Дата окончания</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingPeriod ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Управление уроками и оценками</CardTitle>
              <CardDescription>Добавляйте уроки, выставляйте оценки с разными весами, управляйте четвертями</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => { setEditingType(null); setTypeDialogOpen(true); }}>
                <Icon name="Plus" size={16} className="mr-2" />
                Тип урока
              </Button>
              <Button onClick={() => { setEditingLesson(null); setLessonDialogOpen(true); }}>
                <Icon name="Plus" size={16} className="mr-2" />
                Урок
              </Button>
              <Button onClick={() => { setEditingPeriod(null); setPeriodDialogOpen(true); }}>
                <Icon name="Plus" size={16} className="mr-2" />
                Период
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Типы уроков</h3>
            <div className="flex flex-wrap gap-2">
              {lessonTypes.map(type => (
                <Badge key={type.id} className={`${type.color} text-white`}>
                  {type.name} (вес: {type.weight})
                  <button 
                    onClick={() => { setEditingType(type); setTypeDialogOpen(true); }}
                    className="ml-2 hover:opacity-70"
                  >
                    <Icon name="Edit" size={12} />
                  </button>
                  <button 
                    onClick={() => deleteLessonType(type.id)}
                    className="ml-1 hover:opacity-70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Периоды обучения</h3>
            <div className="flex flex-wrap gap-2">
              {periods.map(period => (
                <Badge key={period.id} variant="outline">
                  {period.name} ({new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()})
                  <button 
                    onClick={() => { setEditingPeriod(period); setPeriodDialogOpen(true); }}
                    className="ml-2 hover:opacity-70"
                  >
                    <Icon name="Edit" size={12} />
                  </button>
                  <button 
                    onClick={() => deletePeriod(period.id)}
                    className="ml-1 hover:opacity-70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 bg-background z-10">Ученик</TableHead>
                  {lessons.map(lesson => {
                    const type = lessonTypes.find(t => t.id === lesson.typeId);
                    return (
                      <TableHead key={lesson.id} className="min-w-[100px]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <Badge className={`${type?.color} text-white text-xs`}>
                              {type?.name}
                            </Badge>
                            <button 
                              onClick={() => { setEditingLesson(lesson); setLessonDialogOpen(true); }}
                              className="hover:opacity-70"
                            >
                              <Icon name="Edit" size={12} />
                            </button>
                            <button 
                              onClick={() => deleteLesson(lesson.id)}
                              className="hover:opacity-70"
                            >
                              <Icon name="Trash2" size={12} />
                            </button>
                          </div>
                          <span className="text-xs">{new Date(lesson.date).toLocaleDateString()}</span>
                          <span className="text-xs font-normal">{lesson.topic}</span>
                        </div>
                      </TableHead>
                    );
                  })}
                  <TableHead className="min-w-[80px]">Средний</TableHead>
                  <TableHead className="min-w-[80px]">Взвеш.</TableHead>
                  {periods.filter(p => p.type === 'quarter').map(period => (
                    <TableHead key={period.id} className="min-w-[80px]">{period.name}</TableHead>
                  ))}
                  {periods.filter(p => p.type === 'exam').map(period => (
                    <TableHead key={period.id} className="min-w-[80px]">{period.name}</TableHead>
                  ))}
                  {periods.filter(p => p.type === 'final').map(period => (
                    <TableHead key={period.id} className="min-w-[80px]">{period.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="sticky left-0 bg-background z-10 font-medium">
                      {student.name}
                    </TableCell>
                    {lessons.map(lesson => {
                      const grade = grades.find(g => g.lessonId === lesson.id && g.studentId === student.id);
                      return (
                        <TableCell key={lesson.id}>
                          <Select 
                            value={grade?.value?.toString() || 'none'}
                            onValueChange={(v) => updateGrade(lesson.id, student.id, v === 'none' ? null : v === 'Зачет' || v === 'Н/А' ? v : parseInt(v))}
                          >
                            <SelectTrigger className="w-[70px]">
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="Зачет">Зачет</SelectItem>
                              <SelectItem value="Н/А">Н/А</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      );
                    })}
                    <TableCell className="font-semibold">{calculateAverage(student.id)}</TableCell>
                    <TableCell className="font-semibold text-primary">{calculateWeightedAverage(student.id)}</TableCell>
                    {periods.filter(p => p.type === 'quarter').map(period => {
                      const grade = finalGrades.find(g => g.studentId === student.id && g.periodId === period.id);
                      return (
                        <TableCell key={period.id}>
                          <Select 
                            value={grade?.value?.toString() || 'none'}
                            onValueChange={(v) => updateFinalGrade(student.id, period.id, v === 'none' ? null : v === 'Зачет' || v === 'Н/А' ? v : parseInt(v))}
                          >
                            <SelectTrigger className="w-[70px]">
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="Зачет">Зачет</SelectItem>
                              <SelectItem value="Н/А">Н/А</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      );
                    })}
                    {periods.filter(p => p.type === 'exam').map(period => {
                      const grade = finalGrades.find(g => g.studentId === student.id && g.periodId === period.id);
                      return (
                        <TableCell key={period.id}>
                          <Select 
                            value={grade?.value?.toString() || 'none'}
                            onValueChange={(v) => updateFinalGrade(student.id, period.id, v === 'none' ? null : v === 'Зачет' || v === 'Н/А' ? v : parseInt(v))}
                          >
                            <SelectTrigger className="w-[70px]">
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="Зачет">Зачет</SelectItem>
                              <SelectItem value="Н/А">Н/А</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      );
                    })}
                    {periods.filter(p => p.type === 'final').map(period => {
                      const grade = finalGrades.find(g => g.studentId === student.id && g.periodId === period.id);
                      return (
                        <TableCell key={period.id}>
                          <Select 
                            value={grade?.value?.toString() || 'none'}
                            onValueChange={(v) => updateFinalGrade(student.id, period.id, v === 'none' ? null : v === 'Зачет' || v === 'Н/А' ? v : parseInt(v))}
                          >
                            <SelectTrigger className="w-[70px]">
                              <SelectValue placeholder="-" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">-</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="Зачет">Зачет</SelectItem>
                              <SelectItem value="Н/А">Н/А</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TypeDialog />
      <LessonDialog />
      <PeriodDialog />
    </div>
  );
};

export default LessonsTab;
