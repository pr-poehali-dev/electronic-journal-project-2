import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AttendanceTab from '@/components/AttendanceTab';
import GradesTab from '@/components/GradesTab';
import HomeworkScheduleTab from '@/components/HomeworkScheduleTab';
import ReportsTab from '@/components/ReportsTab';
import MessengerTab from '@/components/MessengerTab';
import AnalyticsTab from '@/components/AnalyticsTab';
import DiaryTab from '@/components/DiaryTab';
import LessonsTab from '@/components/LessonsTab';

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
  const homeworkScheduleContent = HomeworkScheduleTab({
    students,
    teachers,
    schedule,
    selectedGroup,
    homeworkDialogOpen,
    setHomeworkDialogOpen
  });

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
        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 lg:w-auto">
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <Icon name="GraduationCap" size={16} />
              <span className="hidden sm:inline">Уроки</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Журнал</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <Icon name="Award" size={16} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="diary" className="flex items-center gap-2">
              <Icon name="Notebook" size={16} />
              <span className="hidden sm:inline">Дневник</span>
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
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="LineChart" size={16} />
              <span className="hidden sm:inline">Аналитика</span>
            </TabsTrigger>
            <TabsTrigger value="messenger" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Мессенджер</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              <span className="hidden sm:inline">Отчёты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <LessonsTab />
          </TabsContent>

          <TabsContent value="journal">
            <AttendanceTab
              students={students}
              dates={dates}
              selectedGroup={selectedGroup}
              selectedSubject={selectedSubject}
              setSelectedGroup={setSelectedGroup}
              setSelectedSubject={setSelectedSubject}
              toggleAttendance={toggleAttendance}
              overallStats={overallStats}
            />
          </TabsContent>

          <TabsContent value="grades">
            <GradesTab
              students={students}
              dates={dates}
              selectedGroup={selectedGroup}
              selectedSubject={selectedSubject}
              setSelectedGroup={setSelectedGroup}
              setSelectedSubject={setSelectedSubject}
              selectedStudent={selectedStudent}
              selectedDate={selectedDate}
              gradeDialogOpen={gradeDialogOpen}
              setSelectedStudent={setSelectedStudent}
              setSelectedDate={setSelectedDate}
              setGradeDialogOpen={setGradeDialogOpen}
            />
          </TabsContent>

          <TabsContent value="diary">
            <DiaryTab />
          </TabsContent>

          <TabsContent value="homework">
            {homeworkScheduleContent.homework}
          </TabsContent>

          <TabsContent value="schedule">
            {homeworkScheduleContent.schedule}
          </TabsContent>

          <TabsContent value="teachers">
            {homeworkScheduleContent.teachers}
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="messenger">
            <MessengerTab />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;