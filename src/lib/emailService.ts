
// Сервис для отправки писем
// Примечание: В реальном проекте это должно происходить на сервере для безопасности
// Данный код представляет фронтенд-имитацию для демонстрации

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

/**
 * Имитация отправки электронного письма через аккаунт SGCUtm@gmail.com
 * В реальном приложении это должно быть заменено на запрос к API бэкенда
 */
export const sendVerificationEmail = async (
  email: string, 
  fullName: string
): Promise<boolean> => {
  console.log(`[Email Service] Отправка письма для подтверждения на ${email}`);
  
  const confirmationUrl = `${window.location.origin}/confirm?token=${generateToken(email)}`;
  
  const emailData: EmailData = {
    to: email,
    subject: "Подтверждение регистрации в архиве данных СГЦУ",
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #106cc8; padding: 20px; text-align: center; color: white;">
          <h1>СГЦУ - Архив данных</h1>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
          <h2>Здравствуйте, ${fullName}!</h2>
          
          <p>Благодарим вас за регистрацию в системе архива данных СГЦУ.</p>
          
          <p>Для подтверждения вашего email и завершения регистрации, пожалуйста, нажмите на кнопку ниже:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" style="background-color: #106cc8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Подтвердить регистрацию
            </a>
          </div>
          
          <p>Или перейдите по следующей ссылке:</p>
          <p><a href="${confirmationUrl}">${confirmationUrl}</a></p>
          
          <p>Если вы не регистрировались в нашей системе, просто проигнорируйте это письмо.</p>
          
          <p>С уважением,<br>Команда СГЦУ</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #757575;">
          <p>© ${new Date().getFullYear()} СГЦУ - Система Государственного Централизованного Учета</p>
          <p>Письмо отправлено с адреса SGCUtm@gmail.com</p>
        </div>
      </div>
    `
  };

  try {
    // Имитация отправки - в реальном приложении здесь будет API запрос к серверу
    // В реальном проекте примерно такой: 
    // await api.post('/api/send-email', { 
    //   from: 'SGCUtm@gmail.com', 
    //   password: 'sgcutemka', // В реальном приложении пароль должен храниться на сервере
    //   ...emailData 
    // });
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки отправки
    
    console.log("[Email Service] Письмо успешно отправлено с аккаунта SGCUtm@gmail.com");
    console.log("[Email Service] Получатель:", email);
    console.log("[Email Service] Тема:", emailData.subject);
    
    // В демо-версии возвращаем true, в реальном приложении здесь должен быть анализ ответа от API
    return true;
  } catch (error) {
    console.error("[Email Service] Ошибка отправки письма:", error);
    return false;
  }
};

// Генерация простого токена для подтверждения
// В реальном приложении должен быть более безопасный метод
function generateToken(email: string): string {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 15);
  return btoa(`${email}:${timestamp}:${randomPart}`);
}
