import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteCutlistService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<void> {}
}
