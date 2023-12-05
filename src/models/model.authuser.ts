import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class AuthUser {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() appBuildNumber: number = 0;
  @Expose() appVersion: string = '';
  @Expose() email: string = '';
  @Expose() isActive: boolean = true;
  @Expose() isNotificationEnabled: boolean = true;
  @Expose() name?: string = 'Jaime Joe(Default)';
  @Expose() profileImageUrl: string = '';
  @Expose() userId: string = '';
  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;
  @Expose() @Type(() => Date) timestampLastLogin?: Date | null = null;

  @Expose() subIsLifetime: boolean = false;
  @Expose() @Type(() => Date) subSubscriptionEndDate?: Date | null = null;

  @Expose() stripeLiveCustomerId?: string | null = null;
  @Expose() stripeTestCustomerId?: string | null = null;

  @Expose() @Type(() => Date) subStripeEnd?: Date | null = null;
  @Expose() subStripeLivemode: boolean = false;
  @Expose() subStripePlan: string = '';
  @Expose() subStripePlanAmt: number = 0;
  @Expose() subStripePlanId: string = '';
  @Expose() @Type(() => Date) subStripeStart?: Date | null = null;
  @Expose() subStripeStatus: string = '';

  @Expose() subRevenueCatIsActive: boolean = false;
  @Expose() subRevenueCatWillRenew: boolean = false;
  @Expose() subRevenueCatPeriodType: string = '';
  @Expose() subRevenueCatProductIdentifier: string = '';
  @Expose() subRevenueCatIsSandbox: boolean = false;
  @Expose() @Type(() => Date) subRevenueCatOriginalPurchaseDate?: Date | null = null;
  @Expose() @Type(() => Date) subRevenueCatLatestPurchaseDate?: Date | null = null;
  @Expose() @Type(() => Date) subRevenueCatExpirationDate?: Date | null = null;
  @Expose() @Type(() => Date) subRevenueCatUnsubscribeDetectedAt?: Date | null = null;
  @Expose() @Type(() => Date) subRevenueCatBillingIssueDetectedAt?: Date | null = null;

  static fromJson(json: any): AuthUser {
    return plainToInstance(AuthUser, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: AuthUser): any {
    return instanceToPlain(order);
  }

  get getName(): string {
    return this.name ? this.name : 'Jaime Joe(Default)';
  }

  get getHasSubscription(): boolean {
    if (this.subIsLifetime) return true;
    if (this.subStripeEnd && this.subStripeEnd > new Date()) return true;
    if (this.subRevenueCatExpirationDate && this.subRevenueCatExpirationDate > new Date()) return true;
    return false;
  }
  get getHasSubscriptionString(): String {
    if (this.subIsLifetime) return 'Lifetime';
    if (this.subStripeEnd && this.subStripeEnd > new Date()) return 'Stripe';
    if (this.subRevenueCatExpirationDate && this.subRevenueCatExpirationDate > new Date()) return 'RevenueCat';
    return 'none';
  }

  get getSubscriptionEndDate(): Date | null | undefined {
    if (this.subRevenueCatExpirationDate == null && this.subStripeEnd == null) return null;
    if (this.subRevenueCatExpirationDate != null) return this.subRevenueCatExpirationDate;
    return this.subStripeEnd;
  }
}
