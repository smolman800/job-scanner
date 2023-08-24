import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Vendor } from '../entity/vendor.entity';
import { VendorRepository } from '../application/interface';

@Entity('vendor')
export class VendorOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;
}

export class VendorTypeOrmRepository implements VendorRepository {
  constructor(
    private readonly queryRunner: Repository<VendorOrmEntity>,
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

  async get(id: string): Promise<Vendor> {
    const ormEntity = await this.queryRunner.findOneOrFail({
      where: { id },
    });
    return this.vendorEntity.hydrate({
      id: ormEntity.id,
      name: ormEntity.name,
      url: ormEntity.url,
    });
  }

  async getMany(ids: string[]): Promise<Vendor[]> {
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
