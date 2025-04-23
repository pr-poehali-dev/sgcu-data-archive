
// Иммитация базы данных пользователей для демонстрационных целей
// В реальном проекте данные должны храниться на сервере

interface User {
  id: string;
  email: string;
  fullName: string;
  password: string; // В реальном проекте должен храниться хэш, а не сам пароль
  isEmailVerified: boolean;
  registrationDate: Date;
  lastLoginDate?: Date;
}

interface PendingVerification {
  email: string;
  token: string;
  expiresAt: Date; // Срок действия токена
  userData: Omit<User, 'id' | 'isEmailVerified' | 'registrationDate' | 'lastLoginDate'>;
}

// Имитация хранилища данных - в реальном проекте будет база данных на сервере
class UserDatabase {
  private users: User[] = [];
  private pendingVerifications: PendingVerification[] = [];

  constructor() {
    // Загрузка данных из localStorage при инициализации
    this.loadFromStorage();
  }

  // Сохранение данных в localStorage
  private saveToStorage(): void {
    localStorage.setItem('sgcu_users', JSON.stringify(this.users));
    localStorage.setItem('sgcu_pending_verifications', JSON.stringify(this.pendingVerifications));
  }

  // Загрузка данных из localStorage
  private loadFromStorage(): void {
    try {
      const usersData = localStorage.getItem('sgcu_users');
      const pendingData = localStorage.getItem('sgcu_pending_verifications');

      if (usersData) {
        const parsedUsers = JSON.parse(usersData);
        this.users = parsedUsers.map((user: any) => ({
          ...user,
          registrationDate: new Date(user.registrationDate),
          lastLoginDate: user.lastLoginDate ? new Date(user.lastLoginDate) : undefined
        }));
      }

      if (pendingData) {
        const parsedPending = JSON.parse(pendingData);
        this.pendingVerifications = parsedPending.map((pending: any) => ({
          ...pending,
          expiresAt: new Date(pending.expiresAt)
        }));
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных из localStorage:', error);
      // При ошибке начинаем с пустых массивов
      this.users = [];
      this.pendingVerifications = [];
    }
  }

  // Создать запись о новом пользователе ожидающем подтверждения
  public createPendingUser(email: string, fullName: string, password: string, token: string): boolean {
    // Проверяем, существует ли уже пользователь с таким email
    if (this.users.some(user => user.email === email)) {
      return false; // Пользователь уже существует
    }

    // Удаляем предыдущие ожидающие подтверждения с этим email, если они есть
    this.pendingVerifications = this.pendingVerifications.filter(
      pending => pending.email !== email
    );

    // Создаем новую запись ожидающую подтверждения
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Токен действителен 24 часа

    this.pendingVerifications.push({
      email,
      token,
      expiresAt,
      userData: {
        email,
        fullName,
        password
      }
    });

    this.saveToStorage();
    return true;
  }

  // Подтверждение регистрации пользователя
  public confirmUserRegistration(token: string): boolean {
    // Находим запись с указанным токеном
    const pendingIndex = this.pendingVerifications.findIndex(
      pending => pending.token === token && pending.expiresAt > new Date()
    );

    if (pendingIndex === -1) {
      return false; // Токен не найден или истек срок действия
    }

    const pendingUser = this.pendingVerifications[pendingIndex];
    
    // Создаем нового пользователя
    const newUser: User = {
      id: this.generateUserId(),
      email: pendingUser.userData.email,
      fullName: pendingUser.userData.fullName,
      password: pendingUser.userData.password,
      isEmailVerified: true,
      registrationDate: new Date()
    };

    // Добавляем пользователя в базу данных
    this.users.push(newUser);

    // Удаляем запись из ожидающих подтверждения
    this.pendingVerifications.splice(pendingIndex, 1);

    this.saveToStorage();
    return true;
  }

  // Получение пользователя по email
  public getUserByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }

  // Вход пользователя
  public loginUser(email: string, password: string): User | null {
    const user = this.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      return null; // Неверные учетные данные
    }

    // Обновляем дату последнего входа
    user.lastLoginDate = new Date();
    this.saveToStorage();

    return user;
  }

  // Генерация уникального ID для пользователя
  private generateUserId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  // Получение статистики
  public getStatistics() {
    return {
      totalUsers: this.users.length,
      pendingVerifications: this.pendingVerifications.length,
      verifiedUsers: this.users.filter(user => user.isEmailVerified).length
    };
  }
}

// Экспортируем синглтон для использования во всем приложении
export const userDB = new UserDatabase();
