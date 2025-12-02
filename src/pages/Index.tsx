import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Student {
  id: number;
  name: string;
  attendance: { [key: string]: 'present' | 'absent' | 'late' };
}

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendanceRate: number;
}

const Index = () => {
  const [selectedGroup, setSelectedGroup] = useState('Группа 1');
  const [selectedSubject, setSelectedSubject] = useState('Математика');
  
  const dates = ['01.12', '02.12', '03.12', '04.12', '05.12'];
  
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Иванов Иван Иванович', 
      attendance: {
        '01.12': 'present',
        '02.12': 'present',
        '03.12': 'absent',
        '04.12': 'present',
        '05.12': 'late'
      }
    },
    { 
      id: 2, 
      name: 'Петрова Мария Сергеевна', 
      attendance: {
        '01.12': 'present',
        '02.12': 'late',
        '03.12': 'present',
        '04.12': 'present',
        '05.12': 'present'
      }
    },
    { 
      id: 3, 
      name: 'Сидоров Петр Александрович', 
      attendance: {
        '01.12': 'absent',
        '02.12': 'absent',
        '03.12': 'present',
        '04.12': 'late',
        '05.12': 'present'
      }
    },
    { 
      id: 4, 
      name: 'Козлова Анна Дмитриевна', 
      attendance: {
        '01.12': 'present',
        '02.12': 'present',
        '03.12': 'present',
        '04.12': 'present',
        '05.12': 'present'
      }
    },
    { 
      id: 5, 
      name: 'Морозов Алексей Викторович', 
      attendance: {
        '01.12': 'present',
        '02.12': 'absent',
        '03.12': 'absent',
        '04.12': 'absent',
        '05.12': 'late'
      }
    },
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

  const getAttendanceStats = (student: Student): AttendanceStats => {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
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
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Пользователи</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <Icon name="School" size={16} />
              <span className="hidden sm:inline">Учебный процесс</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="control" className="flex items-center gap-2">
              <Icon name="ClipboardCheck" size={16} />
              <span className="hidden sm:inline">Контроль</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Icon name="FileText" size={16} />
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

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Пользователи</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел управления пользователями в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Учебный процесс</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел учебного процесса в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Расписание и организация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел расписания в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="control" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контроль и взаимодействие</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел контроля в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Отчёты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Раздел отчётов в разработке</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
