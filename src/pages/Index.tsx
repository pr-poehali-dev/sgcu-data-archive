
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Database, Lock, Server } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Database className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">СГЦУ - Архив данных</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="outline" className="text-white border-white hover:bg-white/20" asChild>
              <Link to="/register">Регистрация</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/login">Войти</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Система Государственного Централизованного Учета</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Единая платформа для работы с архивными данными государственного значения
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Начать работу</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Подробнее</a>
            </Button>
          </div>
        </section>
        
        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Централизованное хранение</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Все данные хранятся в единой защищенной системе с многоуровневым доступом
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Защита информации</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Соответствие всем требованиям информационной безопасности и защиты персональных данных
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Быстрый доступ</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Мгновенный поиск по архивам и документам с удобной системой фильтрации
            </p>
          </div>
        </section>
        
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Как начать работу с системой</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Регистрация</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Пройдите регистрацию, используя рабочую электронную почту
              </p>
            </div>
            
            <div className="flex-1">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Подтверждение</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Подтвердите регистрацию по ссылке в письме с адреса SGCUtm@gmail.com
              </p>
            </div>
            
            <div className="flex-1">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Доступ к архиву</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Получите доступ ко всем функциям системы в соответствии с вашим уровнем доступа
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 mr-2" />
                <span className="text-lg font-bold">СГЦУ</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Система Государственного Централизованного Учета - надежное хранение и обработка данных государственного значения
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Ресурсы</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Документация</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Инструкции</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Поддержка</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Контакты</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">Email: SGCUtm@gmail.com</li>
                  <li className="text-gray-400">Телефон: +7 (000) 000-00-00</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
            <p>© {new Date().getFullYear()} СГЦУ - Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
