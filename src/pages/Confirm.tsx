
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { userDB } from "@/lib/userDatabase";
import { CheckCircle2, XCircle, Database } from "lucide-react";

const Confirm = () => {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Извлекаем токен из URL
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
          setErrorMessage("Токен подтверждения отсутствует в URL");
          setIsSuccess(false);
          setIsVerifying(false);
          return;
        }

        // Имитация задержки запроса для демонстрации
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Проверяем токен в нашей "базе данных"
        const confirmResult = userDB.confirmUserRegistration(token);

        if (confirmResult) {
          setIsSuccess(true);
        } else {
          setErrorMessage("Недействительный или просроченный токен подтверждения");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Ошибка при подтверждении регистрации:", error);
        setErrorMessage("Произошла ошибка при подтверждении регистрации. Попробуйте снова позже.");
        setIsSuccess(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Database className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Подтверждение регистрации</CardTitle>
            <CardDescription className="text-center">
              Архив данных СГЦУ
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            {isVerifying ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg">Проверяем ваш токен подтверждения...</p>
              </div>
            ) : isSuccess ? (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-medium">Регистрация успешно подтверждена!</h3>
                <p className="text-muted-foreground">
                  Ваш аккаунт активирован, и вы можете войти в систему, используя свои учетные данные.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <XCircle className="h-16 w-16 text-red-500 mx-auto" />
                <h3 className="text-xl font-medium">Ошибка подтверждения</h3>
                <p className="text-muted-foreground">
                  {errorMessage || "Не удалось подтвердить регистрацию. Пожалуйста, проверьте ссылку или обратитесь в службу поддержки."}
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            {!isVerifying && (
              <Button asChild>
                <Link to={isSuccess ? "/login" : "/"}>
                  {isSuccess ? "Перейти на страницу входа" : "Вернуться на главную"}
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Confirm;
