import { Column, Entity, PrimaryColumn, Repository } from 'typeorm';
import { Vendor, VendorId } from '../entity/vendor.entity';
import { VendorRepository } from '../application/interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Entity('vendor')
export class VendorOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: VendorId;

  @Column()
  name: string;

  @Column()
  url: string;
}

@Injectable()
export class VendorTypeOrmRepository implements VendorRepository {
  constructor(
    @InjectRepository(VendorOrmEntity)
    private readonly queryRunner: Repository<VendorOrmEntity>,
    @Inject('Vendor')
    private readonly vendorEntity: typeof Vendor,
  ) {}

  async create(vendor: Vendor): Promise<void> {
    const ormEntity = new VendorOrmEntity();
    const serializedVendor = vendor.serialize();
    Object.assign(ormEntity, serializedVendor);
    this.queryRunner.save(ormEntity);
  }

  async update(vendor: Vendor): Promise<void> {
    const ormEntity = new VendorOrmEntity();
    const serializedVendor = vendor.serialize();
    Object.assign(ormEntity, serializedVendor);
    this.queryRunner.update(vendor.id, ormEntity);
  }

  async get(id: VendorId): Promise<Vendor> {
    const ormEntity = await this.queryRunner.findOneOrFail({
      where: { id },
    });
    return this.vendorEntity.hydrate({
      id: ormEntity.id,
      name: ormEntity.name,
      url: ormEntity.url,
    });
  }

  async getMany(ids: VendorId[]): Promise<Vendor[]> {
    const ormEntities = await this.queryRunner.find({
      where: ids.map((id) => ({ id })),
    });
    return ormEntities.map((ormEntity) =>
      this.vendorEntity.hydrate({
        id: ormEntity.id,
        name: ormEntity.name,
        url: ormEntity.url,
      }),
    );
  }
}
