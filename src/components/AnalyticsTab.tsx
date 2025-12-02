import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const AnalyticsTab = () => {
  const performanceData = [
    { subject: 'Математика', avgGrade: 4.2, progress: 84, trend: 'up' },
    { subject: 'Физика', avgGrade: 3.8, progress: 76, trend: 'up' },
    { subject: 'Химия', avgGrade: 4.5, progress: 90, trend: 'up' },
    { subject: 'Биология', avgGrade: 3.5, progress: 70, trend: 'down' },
    { subject: 'История', avgGrade: 4.0, progress: 80, trend: 'same' }
  ];

  const topStudents = [
    { name: 'Козлова Анна Дмитриевна', avgGrade: 4.9, attendance: 98 },
    { name: 'Иванов Иван Иванович', avgGrade: 4.5, attendance: 95 },
    { name: 'Петрова Мария Сергеевна', avgGrade: 4.4, attendance: 92 }
  ];

  const needsAttention = [
    { name: 'Морозов Алексей Викторович', avgGrade: 3.2, attendance: 65, issue: 'Низкая посещаемость' },
    { name: 'Сидоров Петр Александрович', avgGrade: 3.0, attendance: 70, issue: 'Падение успеваемости' }
  ];

  const classStats = {
    totalStudents: 25,
    avgGrade: 4.1,
    avgAttendance: 87,
    excellentStudents: 8,
    goodStudents: 12,
    satisfactoryStudents: 4,
    poorStudents: 1
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Аналитика и дашборды</h2>
          <p className="text-sm text-muted-foreground">Мониторинг успеваемости и прогресса</p>
        </div>
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">За неделю</SelectItem>
            <SelectItem value="month">За месяц</SelectItem>
            <SelectItem value="quarter">За четверть</SelectItem>
            <SelectItem value="year">За год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Средний балл класса</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{classStats.avgGrade}</div>
            <Progress value={classStats.avgGrade * 20} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Посещаемость</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{classStats.avgAttendance}%</div>
            <Progress value={classStats.avgAttendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Отличников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">{classStats.excellentStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">из {classStats.totalStudents} студентов</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Требуют внимания</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-red-600">{needsAttention.length}</div>
            <p className="text-xs text-muted-foreground mt-1">студентов</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика по предметам</CardTitle>
            <CardDescription>Средние оценки и прогресс освоения программы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.subject}</span>
                      {item.trend === 'up' && (
                        <Icon name="TrendingUp" size={16} className="text-green-500" />
                      )}
                      {item.trend === 'down' && (
                        <Icon name="TrendingDown" size={16} className="text-red-500" />
                      )}
                    </div>
                    <Badge variant={item.avgGrade >= 4.5 ? "default" : item.avgGrade >= 4 ? "secondary" : "destructive"}>
                      {item.avgGrade}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12 text-right">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ студентов</CardTitle>
            <CardDescription>Лучшие показатели по успеваемости</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                      idx === 0 ? 'bg-yellow-500 text-white' :
                      idx === 1 ? 'bg-gray-400 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Посещаемость: {student.attendance}%
                      </p>
                    </div>
                  </div>
                  <Badge variant="default" className="font-semibold">
                    {student.avgGrade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} className="text-red-500" />
            Требуют внимания
          </CardTitle>
          <CardDescription>Студенты с низкими показателями</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {needsAttention.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex-1">
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{student.issue}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Средний балл</p>
                    <Badge variant="destructive">{student.avgGrade}</Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Посещаемость</p>
                    <Badge variant="destructive">{student.attendance}%</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Распределение оценок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Отлично (5)</span>
                <div className="flex items-center gap-2">
                  <Progress value={(classStats.excellentStudents / classStats.totalStudents) * 100} className="w-24" />
                  <span className="text-sm font-medium w-8">{classStats.excellentStudents}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Хорошо (4)</span>
                <div className="flex items-center gap-2">
                  <Progress value={(classStats.goodStudents / classStats.totalStudents) * 100} className="w-24" />
                  <span className="text-sm font-medium w-8">{classStats.goodStudents}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Удовлетворительно (3)</span>
                <div className="flex items-center gap-2">
                  <Progress value={(classStats.satisfactoryStudents / classStats.totalStudents) * 100} className="w-24" />
                  <span className="text-sm font-medium w-8">{classStats.satisfactoryStudents}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Неудовлетворительно (2)</span>
                <div className="flex items-center gap-2">
                  <Progress value={(classStats.poorStudents / classStats.totalStudents) * 100} className="w-24" />
                  <span className="text-sm font-medium w-8">{classStats.poorStudents}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Выполнение учебного плана</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>ФГОС программа</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Календарный план</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Контрольные работы</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Типичные ошибки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Тема 1: Уравнения</span>
                <Badge variant="destructive">12</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Тема 2: Функции</span>
                <Badge variant="destructive">8</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Тема 3: Графики</span>
                <Badge variant="secondary">5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
