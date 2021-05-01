import { container } from 'tsyringe';

import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';
import PDFKitProvider from '@shared/containers/providers/PDFProvider/implementations/PDFKitProvider';

container.registerSingleton<IPDFProvider>('PDFProvider', PDFKitProvider);
