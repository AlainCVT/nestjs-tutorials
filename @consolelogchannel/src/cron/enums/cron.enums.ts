export enum CronExpression {
  EVERY_SECOND = '* * * * * *',
  EVERY_5_SECONDS = '*/5 * * * * *',
  EVERY_10_SECONDS = '*/10 * * * * *',
  EVERY_30_SECONDS = '*/30 * * * * *',
  EVERY_MINUTE = '* * * * *',
  EVERY_5_MINUTES = '*/5 * * * *',
  EVERY_HOUR = '0 * * * *',
  EVERY_DAY_AT_MIDNIGHT = '0 0 * * *',
  EVERY_MONDAY_AT_9AM = '0 9 * * 1',
}
