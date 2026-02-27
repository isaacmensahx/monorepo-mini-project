import { config } from '../config';

export type AnalyticsEventName =
  | 'card.created'
  | 'card.updated'
  | 'card.deleted'
  | 'card.viewed'
  | 'cards.listed';

export interface AnalyticsEvent {
  event: AnalyticsEventName;
  timestamp: string;
  properties?: Record<string, unknown>;
}

class AnalyticsService {
  private enabled: boolean;

  constructor() {
    this.enabled = config.analytics.enabled;
  }

  track(event: AnalyticsEventName, properties?: Record<string, unknown>): void {
    if (!this.enabled) return;

    const payload: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      properties,
    };

    // In production this would send to a real analytics platform (Segment, Mixpanel, etc.)
    console.log(`[Analytics] ${JSON.stringify(payload)}`);
  }
}

export const analyticsService = new AnalyticsService();
