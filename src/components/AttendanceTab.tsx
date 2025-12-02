import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Student {
  id: number;
  name: string;
  group: string;
  attendance: { [key: string]: 'present' | 'absent' | 'late' };
  grades: { [subject: string]: { [date: string]: { grade: number; comment?: string; type: 'current' | 'control' | 'final' } } };
  homework: { subject: string; description: string; dueDate: string; files?: string[] }[];
}

interface AttendanceTabProps {
  students: Student[];
  dates: string[];
  selectedGroup: string;
  selectedSubject: string;
  setSelectedGroup: (value: string) => void;
  setSelectedSubject: (value: string) => void;
  toggleAttendance: (studentId: number, date: string) => void;
  overallStats: {
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    totalRecords: number;
    attendanceRate: number;
  };
}

const AttendanceTab = ({
  students,
  dates,
  selectedGroup,
  selectedSubject,
  setSelectedGroup,
  setSelectedSubject,
  toggleAttendance,
  overallStats
}: AttendanceTabProps) => {
  const getAttendanceStats = (student: Student) => {
    const values = Object.values(student.attendance);
    const totalDays = values.length;
    const presentDays = values.filter(v => v === 'present').length;
    const absentDays = values.filter(v => v === 'absent').length;
    const lateDays = values.filter(v => v === 'late').length;
    const attendanceRate = Math.round((presentDays / totalDays) * 100);
    
    return { totalDays, presentDays, absentDays, lateDays, attendanceRate };
  };

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
    <div className="space-y-6">
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
    </div>
  );
};

export default AttendanceTab;
