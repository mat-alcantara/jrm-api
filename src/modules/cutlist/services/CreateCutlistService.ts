import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import CutlistEntity from '@modules/cutlist/infra/typeorm/entities/CutlistEntity';

import ICreateCutlistDTO from '@modules/cutlist/dtos/ICreateCutlistDTO';
import ICutlistRepository from '@modules/cutlist/repositories/ICutlistsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateMaterialService {
  constructor(
    @inject('CutlistsRepository')
    private cutlistsRepository: ICutlistRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(cutlistData: ICreateCutlistDTO): Promise<CutlistEntity> {
    // Check if customer exist
    const { customerId } = cutlistData;

    const doesCustomerExist = await this.customersRepository.findCustomerById(
      customerId,
    );

    if (!doesCustomerExist) {
      throw new AppError('Customer does not exist', 404);
    }

    // Create a new cutlist
    const cutlistCreated = await this.cutlistsRepository.createCutlist(
      cutlistData,
    );

    return cutlistCreated;
  }
}
