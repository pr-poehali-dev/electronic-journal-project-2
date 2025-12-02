import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ReportsTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ReportsTab;
