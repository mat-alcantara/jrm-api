import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';

import ICutlistRepository from '@modules/orders/repositories/ICutlistsRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowSpecificOrderService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,
  ) {}

  public async execute(id: string): Promise<OrderEntity> {
    const specificCutlist = await this.cutlistsRepository.findCutlistById(id);

    if (!specificCutlist) {
      throw new AppError('Cutlist does not exist', 404);
    }

    return specificCutlist;
  }
}
