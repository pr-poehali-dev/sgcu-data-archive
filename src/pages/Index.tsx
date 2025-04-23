
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Archive, Database, FileText, Search, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container px-4 py-8 mx-auto">
        <header className="flex flex-col items-center justify-between py-6 mb-12 md:flex-row">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">СГЦУ Архив</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Войти</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Регистрация</Link>
            </Button>
          </div>
        </header>

        <main>
          <section className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Архив данных СГЦУ</h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
              Централизованное хранилище документов и данных с удобным доступом и надежной защитой
            </p>
          </section>

          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <Archive className="w-12 h-12 mb-2 text-primary" />
                <CardTitle>Архивные документы</CardTitle>
                <CardDescription>
                  Полный комплект документации с удобным поиском и сортировкой
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Быстрый доступ к архивным материалам различных категорий, включая исторические и текущие документы.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Просмотреть документы</Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <FileText className="w-12 h-12 mb-2 text-primary" />
                <CardTitle>База знаний</CardTitle>
                <CardDescription>
                  Структурированная информация по всем направлениям работы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Централизованный доступ к инструкциям, регламентам и методическим материалам.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Открыть базу знаний</Button>
              </CardFooter>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <Search className="w-12 h-12 mb-2 text-primary" />
                <CardTitle>Поиск информации</CardTitle>
                <CardDescription>
                  Интеллектуальный поиск по всему архиву
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Быстрый поиск по ключевым словам с фильтрацией по типу документа, дате и другим параметрам.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Перейти к поиску</Button>
              </CardFooter>
            </Card>
          </section>

          <section className="py-16 mt-16 text-center bg-primary/5 rounded-xl">
            <UserPlus className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="mb-3 text-3xl font-bold">Присоединяйтесь к нашей системе</h2>
            <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
              Зарегистрируйтесь, чтобы получить доступ к полному архиву данных СГЦУ
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Зарегистрироваться</Link>
            </Button>
          </section>
        </main>

        <footer className="py-8 mt-16 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>© 2024 СГЦУ Архив. Все права защищены.</p>
            <p>Домен: sgcu.ru</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
