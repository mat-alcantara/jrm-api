import { container } from 'tsyringe';

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider';
import DatefnsDateProvider from '@shared/containers/providers/DateProvider/implementations/DateFnsDateProvider';

container.registerSingleton<IDateProvider>('HashProvider', DatefnsDateProvider);
