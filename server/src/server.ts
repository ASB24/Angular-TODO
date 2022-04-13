import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import TasksRoute from '@routes/todo.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new TasksRoute()]);

app.listen();
