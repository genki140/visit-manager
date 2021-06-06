import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(@Inject(OrganizationService) private organizationService: OrganizationService) {}

  private test = 1;

  // 本来ここじゃないけどやっつけ実装
  @Query(() => String)
  async googleMapApiKey() {
    return process.env.GOOGLE_MAP_API_KEY?.toString() ?? '';
  }

  // 配信のテスト
  @Query(() => Number)
  async getTest() {
    return this.test;
  }

  pubSub = new PubSub();

  @Mutation(() => Number)
  async addTest() {
    this.test++;
    this.pubSub.publish('testAdded', { testAdded: this.test });
    return this.test;
  }

  @Subscription(() => Number)
  testAdded() {
    return this.pubSub.asyncIterator('testAdded');
  }
}
