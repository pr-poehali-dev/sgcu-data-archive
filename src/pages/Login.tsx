
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { userDB } from "@/lib/userDatabase";

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(1, { message: "Введите пароль" })
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Попытка входа
      const user = userDB.loginUser(values.email, values.password);
      
      if (user) {
        // Успешный вход
        toast.success("Вход выполнен успешно", {
          description: `Добро пожаловать, ${user.fullName}!`
        });
        
        // Имитация задержки для демонстрации
        setTimeout(() => {
          // В реальном приложении здесь был бы редирект на страницу кабинета
          navigate("/dashboard");
        }, 1000);
        
      } else {
        // Неверные учетные данные
        toast.error("Ошибка входа", {
          description: "Неверный email или пароль"
        });
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      toast.error("Произошла ошибка", {
        description: "Пожалуйста, попробуйте позже"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Link>
        
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Database className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Вход в СГЦУ</CardTitle>
            <CardDescription className="text-center">
              Введите свои учетные данные для доступа к архиву данных
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input className="pl-10" placeholder="email@sgcu.ru" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input className="pl-10" type="password" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-right">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Забыли пароль?
                  </a>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Вход..." : "Войти"}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Зарегистрироваться
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              Входя в систему, вы соглашаетесь с условиями использования СГЦУ
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
