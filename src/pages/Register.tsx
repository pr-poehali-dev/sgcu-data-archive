
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, Mail, User, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { sendVerificationEmail } from "@/lib/emailService";
import { userDB } from "@/lib/userDatabase";

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  fullName: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  password: z.string().min(8, { message: "Пароль должен содержать минимум 8 символов" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Проверяем, не существует ли уже пользователя с таким email
      const existingUser = userDB.getUserByEmail(values.email);
      
      if (existingUser) {
        toast.error("Пользователь с таким email уже существует", {
          description: "Пожалуйста, используйте другой email или выполните вход",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Генерируем токен и сохраняем данные пользователя
      const token = btoa(`${values.email}:${Date.now()}:${Math.random().toString(36).slice(2)}`);
      userDB.createPendingUser(values.email, values.fullName, values.password, token);
      
      // Отправка письма для подтверждения
      const emailSent = await sendVerificationEmail(values.email, values.fullName);
      
      if (emailSent) {
        console.log("Регистрационные данные:", values);
        
        toast.success("Письмо с подтверждением отправлено на вашу почту", {
          description: `Мы отправили инструкции на ${values.email}`,
          duration: 5000,
        });
        
        setIsSuccess(true);
      } else {
        toast.error("Ошибка при отправке письма", {
          description: "Пожалуйста, попробуйте позже",
        });
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      toast.error("Ошибка при регистрации", {
        description: "Пожалуйста, попробуйте позже",
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
            <CardTitle className="text-2xl text-center">Регистрация в СГЦУ</CardTitle>
            <CardDescription className="text-center">
              Создайте аккаунт для доступа к архиву данных СГЦУ
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-medium">Проверьте свою почту</h3>
                <p className="text-muted-foreground">
                  Мы отправили письмо с подтверждением на ваш email. 
                  Перейдите по ссылке в письме для завершения регистрации.
                </p>
                <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Важно:</span> Письмо отправлено с адреса <span className="font-medium">SGCUtm@gmail.com</span>. 
                    Пожалуйста, проверьте папку "Спам", если не видите письмо во входящих.
                  </p>
                </div>
              </div>
            ) : (
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
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input className="pl-10" placeholder="Иванов Иван Иванович" {...field} />
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
                        <FormDescription>
                          Минимум 8 символов
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтверждение пароля</FormLabel>
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
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Войти
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              Регистрируясь, вы соглашаетесь с условиями использования СГЦУ
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
