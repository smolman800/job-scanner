import { Inject, Injectable } from '@nestjs/common';
import { Column, Entity, Index, PrimaryColumn, Repository } from 'typeorm';
import {
  GetManyJobListingParam,
  JobListingRepository,
} from '../application/interface';
import { InjectRepository } from '@nestjs/typeorm';
import { JobListing } from '../entity/jobListing.entity';

@Entity('job_listing')
@Index('idx_postDate_jobTitle_vendorId', ['postDate', 'jobTitle', 'vendorId'])
@Index('idx_postDate_vendorId', ['postDate', 'vendorId'])
export class JobListingOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column()
  platformId: string;

  @Column()
  pageUrl: string;

  @Column({ type: 'float', nullable: true })
  salaryMin: number | null;

  @Column({ type: 'float', nullable: true })
  salaryMax: number | null;

  @Column({ nullable: true })
  currency: string;

  @Column()
  jobTitle: string;

  @Column()
  company: string;

  @Column()
  postDate: string;

  @Column('text', { array: true })
  jobDescription: string[];

  @Column('text', { array: true, nullable: true })
  benefit: string[];

  @Column()
  industry: string;

  @Column()
  vendorId: string;

  @Column()
  vendorName: string;

  @Column()
  vendorUrl: string;
}

@Injectable()
export class JobListingTypeOrmRepository implements JobListingRepository {
  constructor(
    @InjectRepository(JobListingOrmEntity)
    private readonly repository: Repository<JobListingOrmEntity>,
    @Inject('JobListing')
    private readonly jobListing: typeof JobListing,
  ) {}

  async get(id: string): Promise<JobListing> {
    const ormEntity = await this.repository.findOneOrFail({
      where: { id },
    });
    return this.jobListing.hydrate({
      ...ormEntity,
    });
  }

  async getMany(param: GetManyJobListingParam): Promise<JobListing[]> {
    const where = this.buildWhere(param);
    const ormEntities = await this.repository.find({
      where,
    });
    return ormEntities.map((ormEntity) => {
      return this.jobListing.hydrate({
        ...ormEntity,
      });
    });
  }

  async upsert(jobListing: JobListing[]): Promise<void> {
    const ormEntities = jobListing.map((jobListing) => {
      const ormEntity = new JobListingOrmEntity();
      const serializedListing = jobListing.serialize();
      Object.assign(ormEntity, serializedListing);
      return ormEntity;
    });
    await this.repository.save(ormEntities);
  }

  private buildWhere(param: GetManyJobListingParam) {
    const where: any = {};
    if ('ids' in param) {
      where.id = param.ids;
    } else {
      where.postDate = param.from;
      if ('jobTitle' in param) {
        where.jobTitle = param.jobTitle;
      }
      if ('vendorId' in param) {
        where.vendorId = param.vendorId;
      }
    }
    return where;
  }
}
