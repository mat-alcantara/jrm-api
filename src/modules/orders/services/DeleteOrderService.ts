import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteOrderService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cutlistToRemove = await this.cutlistsRepository.findCutlistById(id);

    if (!cutlistToRemove) {
      throw new AppError('Cutlist does not exist', 404);
    }

    await this.cutlistsRepository.deleteCutlist(cutlistToRemove);
  }
}
