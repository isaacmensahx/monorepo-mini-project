import { appConfig } from '../config/app.config';

export type FrontendEventName =
  | 'card_create_initiated'
  | 'card_created'
  | 'card_edit_initiated'
  | 'card_updated'
  | 'card_delete_initiated'
  | 'card_deleted'
  | 'card_create_cancelled'
  | 'card_edit_cancelled'
  | 'page_viewed';

export interface AnalyticsEvent {
  event: FrontendEventName;
  timestamp: string;
  properties?: Record<string, unknown>;
}

class FrontendAnalytics {
  track(event: FrontendEventName, properties?: Record<string, unknown>): void {
    if (!appConfig.features.enableAnalytics) return;

    const payload: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      properties,
    };

    // In production: send to Segment, Mixpanel, etc.
    console.log(`[FE Analytics] ${JSON.stringify(payload)}`);
  }
}

export const analytics = new FrontendAnalytics();
