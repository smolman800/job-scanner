import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { JobPost } from '../entity/jobPost.entity';
import { VendorOrmEntity } from './vendor.repository';
import { JobPostRepository } from '../application/interface';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Entity('job_post')
export class JobPostOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
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

  @ManyToOne(() => VendorOrmEntity)
  @JoinColumn({ name: 'vendor_id' })
  vendor: VendorOrmEntity;
}

@Injectable()
export class JobPostTypeOrmRepository implements JobPostRepository {
  constructor(
    @InjectRepository(JobPostOrmEntity)
    private readonly queryRunner: Repository<JobPostOrmEntity>,
    @Inject('JobPost')
    private readonly jobPostEntity: typeof JobPost,
  ) {}

  async create(jobPost: JobPost[]): Promise<void> {
    const ormEntities = jobPost.map((jobPost) => {
      const ormEntity = new JobPostOrmEntity();
      const serializedJobPost = jobPost.serialize();
      Object.assign(ormEntity, serializedJobPost);
      return ormEntity;
    });
    await this.queryRunner.save(ormEntities);
  }

  async update(jobPost: JobPost[]): Promise<void> {
    const ormEntities = jobPost.map((jobPost) => {
      const ormEntity = new JobPostOrmEntity();
      const serializedJobPost = jobPost.serialize();
      Object.assign(ormEntity, serializedJobPost);
      return ormEntity;
    });
    this.queryRunner.save(ormEntities);
  }

  async get(id: string): Promise<JobPost> {
    const ormEntity = await this.queryRunner.findOneOrFail({
      where: { id },
    });
    return this.jobPostEntity.hydrate({
      id: ormEntity.id,
      platformId: ormEntity.platformId,
      pageUrl: ormEntity.pageUrl,
      salaryMin: ormEntity.salaryMin,
      salaryMax: ormEntity.salaryMax,
      currency: ormEntity.currency,
      jobTitle: ormEntity.jobTitle,
      company: ormEntity.company,
      postDate: ormEntity.postDate,
      jobDescription: ormEntity.jobDescription,
      benefit: ormEntity.benefit,
      industry: ormEntity.industry,
      vendorId: ormEntity.vendorId,
    });
  }

  async getMany(ids: string[]): Promise<JobPost[]> {
    const ormEntities = await this.queryRunner.find({
      where: ids.map((id) => ({ id })),
    });
    return ormEntities.map((ormEntity) =>
      this.jobPostEntity.hydrate({
        id: ormEntity.id,
        platformId: ormEntity.platformId,
        pageUrl: ormEntity.pageUrl,
        salaryMin: ormEntity.salaryMin,
        salaryMax: ormEntity.salaryMax,
        currency: ormEntity.currency,
        jobTitle: ormEntity.jobTitle,
        company: ormEntity.company,
        postDate: ormEntity.postDate,
        jobDescription: ormEntity.jobDescription,
        benefit: ormEntity.benefit,
        industry: ormEntity.industry,
        vendorId: ormEntity.vendorId,
      }),
    );
  }
}
