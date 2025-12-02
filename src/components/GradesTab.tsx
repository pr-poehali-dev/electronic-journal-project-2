import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface GradesTabProps {
  students: Student[];
  dates: string[];
  selectedGroup: string;
  selectedSubject: string;
  setSelectedGroup: (value: string) => void;
  setSelectedSubject: (value: string) => void;
  selectedStudent: number | null;
  selectedDate: string;
  gradeDialogOpen: boolean;
  setSelectedStudent: (id: number | null) => void;
  setSelectedDate: (date: string) => void;
  setGradeDialogOpen: (open: boolean) => void;
}

const GradesTab = ({
  students,
  dates,
  selectedGroup,
  selectedSubject,
  setSelectedGroup,
  setSelectedSubject,
  selectedStudent,
  selectedDate,
  gradeDialogOpen,
  setSelectedStudent,
  setSelectedDate,
  setGradeDialogOpen
}: GradesTabProps) => {
  const getAverageGrade = (student: Student, subject: string): number => {
    const grades = student.grades[subject];
    if (!grades) return 0;
    
    const gradeValues = Object.values(grades).map(g => g.grade);
    if (gradeValues.length === 0) return 0;
    
    const sum = gradeValues.reduce((a, b) => a + b, 0);
    return Math.round((sum / gradeValues.length) * 10) / 10;
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 5) return 'bg-green-500 text-white';
    if (grade >= 4) return 'bg-blue-500 text-white';
    if (grade >= 3) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default GradesTab;
