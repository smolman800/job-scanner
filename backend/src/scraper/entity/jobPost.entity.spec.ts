import { createJobPostProps } from '../helper/test';
import { JobPost } from './jobPost.entity';

describe('JobPost', () => {
  test('create should return and instance of JobPost', () => {
    const { id, ...props } = createJobPostProps();
    const jobPost = JobPost.create(props, id);
    expect(jobPost).toBeInstanceOf(JobPost);
  });

  test('hydrate should return and instance of JobPost', () => {
    const jobPost = JobPost.hydrate(createJobPostProps());
    expect(jobPost).toBeInstanceOf(JobPost);
  });

  test('create should throw error if salaryMin is greater than salaryMax', () => {
    const props = createJobPostProps({
      salaryMin: 20000,
      salaryMax: 10000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'salaryMin must be less than salaryMax',
    );
  });

  test('create should throw error if salaryMin is negative', () => {
    const props = createJobPostProps({
      salaryMin: -10000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'salaryMin must be positive',
    );
  });

  test('create should throw error if salaryMax is negative', () => {
    const props = createJobPostProps({
      salaryMax: -10000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'salaryMax must be positive',
    );
  });

  test('create should throw error if jobTitle is empty', () => {
    const props = createJobPostProps({
      jobTitle: '',
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'jobTitle cannot be empty',
    );
  });

  test('create should throw error if currency is not accepted', () => {
    const props = createJobPostProps({
      currency: 'USD',
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'currency: USD, is not supported',
    );
  });

  test('create should throw error if currency is null and salaryMin is not null', () => {
    const props = createJobPostProps({
      currency: null,
      salaryMin: 10000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'currency cannot be null if salaryMin or salaryMax is not null',
    );
  });

  test('create should throw error if currency is null and salaryMax is not null', () => {
    const props = createJobPostProps({
      currency: null,
      salaryMax: 10000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'currency cannot be null if salaryMin or salaryMax is not null',
    );
  });

  test('create should throw error if currency is null and salaryMin and salaryMax is not null', () => {
    const props = createJobPostProps({
      currency: null,
      salaryMin: 10000,
      salaryMax: 20000,
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'currency cannot be null if salaryMin or salaryMax is not null',
    );
  });

  test('create should not throw error if currency is null and salaryMin and salaryMax is null', () => {
    const props = createJobPostProps({
      currency: null,
      salaryMin: null,
      salaryMax: null,
    });
    expect(() => JobPost.create(props, props.id)).not.toThrow();
  });

  test('create should not throw error if currency is not null and salaryMin and salaryMax is null', () => {
    const props = createJobPostProps({
      currency: 'THB',
      salaryMin: null,
      salaryMax: null,
    });
    expect(() => JobPost.create(props, props.id)).not.toThrow();
  });

  test('create should not throw error if currency is not null and salaryMin is null', () => {
    const props = createJobPostProps({
      currency: 'THB',
      salaryMin: null,
    });
    expect(() => JobPost.create(props, props.id)).not.toThrow();
  });

  test('create should not throw error if currency is not null and salaryMax is null', () => {
    const props = createJobPostProps({
      currency: 'THB',
      salaryMax: null,
    });
    expect(() => JobPost.create(props, props.id)).not.toThrow();
  });

  test('create should throw error if postDate is not a valid date', () => {
    const props = createJobPostProps({
      postDate: 'invalid date',
    });
    expect(() => JobPost.create(props, props.id)).toThrow(
      'postDate must be a valid date',
    );
  });

  test('create should store date in UTC timezone when parsing 2023-11-03T11:50:01.281682+07:00', () => {
    const props = createJobPostProps({
      postDate: '2023-11-03T11:50:01.281682+07:00',
    });
    const jobPost = JobPost.create(props, props.id);
    expect(jobPost['props']['postDate']).toBe('2023-11-03T04:50:01.281Z');
  });

  test('serialize should return props', () => {
    const props = createJobPostProps();
    const jobPost = JobPost.hydrate(props);
    expect(jobPost.serialize()).toEqual({
      ...props,
      postDate: '2023-08-27T17:58:07.000Z',
    });
  });
});
